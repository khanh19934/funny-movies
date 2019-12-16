import * as Mongoose from "mongoose";
import {IDataConfiguration} from "./configs"
import {IUser, UserModel} from "./api/users/user.model";
import {IVideos, VideoModel} from "./api/videos/videos.model";
import {IRefreshToken, RefreshTokenModel} from "./api/refreshTokens/refreshTokens.model";

export interface IDatabase {
    userModel: Mongoose.Model<IUser>
    videoModel: Mongoose.Model<IVideos>
    refreshTokenModel: Mongoose.Model<IRefreshToken>
}

export const init = (config: IDataConfiguration): IDatabase  => {
    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,  useFindAndModify: false });

    let mongoDb = Mongoose.connection;

    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}` );

    });

    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });



    return {
        userModel: UserModel,
        videoModel: VideoModel,
        refreshTokenModel: RefreshTokenModel
    }
}

