import * as Hapi from "hapi"
import * as Boom from "boom"
import {isNil} from "ramda"

import {IDatabase} from "../../database";
import {IServerConfigurations} from "../../configs";
import {IShareVideoRequest, IVideoListRequest} from "../../interfaces/request";

export default class VideoController {
    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async shareVideo(request: IShareVideoRequest, h: Hapi.ResponseToolkit) {
        try {
            const userId = request.auth.credentials.id;
            const videoShared = await this.database.videoModel.create(Object.assign(request.payload, {sharedBy: userId}))
            return h.response(videoShared)
        } catch (e) {
            Boom.badImplementation(e)
        }
    }

    public async getVideoList(request: IVideoListRequest, h: Hapi.ResponseToolkit) {
        try {
            const limit = Number.isNaN(parseInt(request.query.limit)) ? 0 : parseInt(request.query.limit)
            const page = Number.isNaN(parseInt(request.query.page)) ? 1 : parseInt(request.query.page) === 0 ? 1 : parseInt(request.query.page)
            const videoList = await this.database.videoModel.find()
                .sort({createdAt: '-1'})
                .populate("sharedBy", "email")
                .skip((page - 1) * limit)
                .limit(limit)


            const total = await this.database.videoModel.countDocuments({})

            return h.response({
                total,
                page: page,
                videoList: videoList.map(item => ({
                    _id: item._id,
                    title: item.title,
                    totalThumbUp: item.thumb_up.length,
                    totalThumbDown: item.thumb_down.length,
                    videoURL: item.videoURL,
                    sharedBy: item.sharedBy,
                    description: item.description,
                    isThumbUpAlready: isNil(request.auth.credentials) ? false : item.thumb_up.includes(request.auth.credentials.id),
                    isThumbDownAlready: isNil(request.auth.credentials) ? false : item.thumb_down.includes(request.auth.credentials.id)
                })),
                hasMore: page * limit < total
            })

        } catch (e) {
            return Boom.badImplementation(e)
        }
    }
}