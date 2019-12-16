import * as Mongoose from "mongoose"

export interface IRefreshToken extends Mongoose.Document{
    userId: string;
    refreshToken: string;
}

export const RefreshTokenSchema = new Mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

export const RefreshTokenModel = Mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);