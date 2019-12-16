import * as Jwt from "jsonwebtoken"
import {isNil, pick} from "ramda"

import {IServerConfigurations} from "../../configs";
import {IDatabase} from "../../database";

export default class SocketController {
    private configs: IServerConfigurations
    private io: any
    private database: IDatabase

    constructor(configs: IServerConfigurations, io, database: IDatabase) {
        this.configs = configs
        this.io = io
        this.database = database
    }

    public async initSocket() {
        this.io.on('connection', (socket) => {
            socket.on('THUMB_UP', async (data: { videoId: string }) => {
                let thumbUpAlready = false
                const video = await this.database.videoModel.findById({_id: data.videoId}).populate('sharedBy', 'email')
                if (video.thumb_up.includes(socket.request.user)) {
                    video.thumb_up.splice(video.thumb_up.indexOf(socket.request.user), 1)
                    thumbUpAlready = false
                } else {
                    video.thumb_up.unshift(socket.request.user)
                    if (video.thumb_down.includes(socket.request.user)) {
                        video.thumb_down.splice(video.thumb_down.indexOf(socket.request.user), 1)
                    }

                    thumbUpAlready = true
                }

                const res = await video.save();

                socket.emit('THUMB_UP_RESPONSE', {
                    _id: res._id,
                    title: res.title,
                    totalThumbUp: res.thumb_up.length,
                    totalThumbDown: res.thumb_down.length,
                    videoURL: res.videoURL,
                    sharedBy: res.sharedBy,
                    description: res.description,
                    isThumbUpAlready: thumbUpAlready,
                    isThumbDownAlready: false
                })
            })

            socket.on('THUMB_DOWN', async (data: { videoId: string }) => {
                let thumbDownAlready = false
                const video = await this.database.videoModel.findById({_id: data.videoId}).populate('sharedBy', 'email')
                if (video.thumb_down.includes(socket.request.user)) {
                    video.thumb_down.splice(video.thumb_down.indexOf(socket.request.user), 1)
                    thumbDownAlready = false
                } else {
                    video.thumb_down.unshift(socket.request.user)
                    if (video.thumb_up.includes(socket.request.user)) {
                        video.thumb_up.splice(video.thumb_up.indexOf(socket.request.user), 1)
                    }
                    thumbDownAlready = true
                }

                const res = await video.save()

                socket.emit('THUMB_DOWN_RESPONSE', {
                    _id: res._id,
                    title: res.title,
                    totalThumbUp: res.thumb_up.length,
                    totalThumbDown: res.thumb_down.length,
                    videoURL: res.videoURL,
                    sharedBy: res.sharedBy,
                    description: res.description,
                    isThumbUpAlready: false,
                    isThumbDownAlready: thumbDownAlready
                })

            })
        })
    }
}