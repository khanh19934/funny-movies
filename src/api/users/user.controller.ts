import * as Hapi from 'hapi'
import * as Boom from 'boom'
import * as Jwt from "jsonwebtoken"
import * as Bcrypt from "bcryptjs";
import {uuid} from 'uuidv4';

import {IUser} from "./user.model"
import {IDatabase} from "../../database"
import {IServerConfigurations} from "../../configs"
import {ILoginRequest, IReGenerateToken, IRequest} from "../../interfaces/request"

export default class UserController {
    private database: IDatabase;
    private configs: IServerConfigurations

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database
        this.configs = configs
    }

    private generateToken(user: IUser) {
        const jwtSecret = this.configs.jwtSecret
        const jwtExpiration = this.configs.jwtExpiration
        const payload = {
            id: user._id
        }
        return Jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration})
    }

    protected async generateRefreshToken(): Promise<string> {
        const uid = uuid()
        const SALT_ROUNDS: number = 8

        return await Bcrypt.hash(uid, SALT_ROUNDS)
    }

    protected async verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                Jwt.verify(token, this.configs.jwtSecret, (err, decoded: { id: string }) => {
                    resolve(decoded.id)
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
        const {email, password} = request.payload
        let user: IUser = await this.database.userModel.findOne({email})

        if (!user) {
            try {
                const refreshToken = await this.generateRefreshToken()
                const userInfo: IUser = await this.database.userModel.create({
                    ...request.payload,
                });

                await this.database.refreshTokenModel.create({
                    userId: userInfo._id,
                    refreshToken
                })
                return h.response({token: this.generateToken(userInfo), refreshToken}).code(201);
            } catch (e) {
                return Boom.badImplementation(e);
            }
        }

        if (!user.validatePassword(password)) {
            return Boom.unauthorized('Password is invalid')
        }
        const refreshToken = await this.generateRefreshToken()

        await this.database.refreshTokenModel.findOneAndUpdate({userId: user._id}, {$set: {'refreshToken': refreshToken}}, {new: true})
        await user.save()

        return {
            token: this.generateToken(user),
            refreshToken
        }
    }

    public async createUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
        try {
            const refreshToken = await this.generateRefreshToken()
            let user: IUser = await this.database.userModel.create({...request.payload});
            await this.database.refreshTokenModel.create({
                userId: user._id,
                refreshToken
            })
            return h.response({token: this.generateToken(user), refreshToken}).code(201);
        } catch (e) {
            return Boom.badImplementation(e);
        }
    }

    public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
        const id = request.auth.credentials.id;

        try {
            let user: IUser = await this.database.userModel.findByIdAndUpdate(
                id,
                {$set: request.payload},
                {new: true}
            );
            return user;
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
        const id = request.auth.credentials.id;
        let user: IUser = await this.database.userModel.findByIdAndRemove(id);

        return user;
    }

    public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
        const id = request.auth.credentials.id;
        let user: IUser = await this.database.userModel.findById(id);

        return {
            email: user.email
        };
    }

    public async handleGenerateNewToken(request: IReGenerateToken, h: Hapi.ResponseToolkit) {
        try {
            const userRefreshToken = request.payload.refreshToken
            const {userId} = await this.database.refreshTokenModel.findOne({refreshToken: userRefreshToken})
            const newRefreshToken = await this.generateRefreshToken()
            if (!userId) {
                return Boom.badImplementation()
            }
            await this.database.refreshTokenModel.findOneAndUpdate({userId}, {$set: {'refreshToken': newRefreshToken}}, {new: true})
            return h.response({
                token: this.generateToken({_id: userId} as any),
                refreshToken: newRefreshToken
            })
        } catch (e) {
            return Boom.badImplementation(e);
        }
    }

    public async logoutUser(request: IRequest, h: Hapi.ResponseToolkit) {
        try {
            const id = request.auth.credentials.id;
            await this.database.refreshTokenModel.findOneAndDelete({userId: id})
            return h.response({
                data: ""
            })
        } catch (e) {
            return Boom.badImplementation(e)
        }
    }
}