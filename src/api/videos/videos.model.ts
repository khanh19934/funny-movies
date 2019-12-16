import * as Mongoose from "mongoose"

export interface IVideos extends  Mongoose.Document {
    title: string;
    description: string;
    sharedBy: {
        email: string
    }
    createAt: Date;
    updatedAt: Date;
    videoURL: string;
    thumb_up: string[];
    thumb_down: string[];
}

export const VideoSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sharedBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    thumb_up: [String],
    thumb_down: [String]
}, {timestamps: true})

export const VideoModel = Mongoose.model<IVideos>("Video", VideoSchema)