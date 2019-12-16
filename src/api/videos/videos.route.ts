import * as Hapi from "hapi"

import * as VideoValidator from "./videos.validator"
import * as UserValidator from "../users/user.validator"
import VideoController from "./videos.controller";
import {IDatabase} from "../../database";
import {IServerConfigurations} from "../../configs";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
    const videoController = new VideoController(serverConfigs, database)
    server.bind(videoController)

    server.route({
        method: "GET",
        path: "/api/video-list",
        options: {
            handler: videoController.getVideoList,
            auth: false,
            tags: ["api", "videos"],
            description: "Get video list"
        }
    })

    server.route({
        method: "POST",
        path: "/api/share-video",
        options: {
            handler: videoController.shareVideo,
            auth: "jwt",
            tags: ["api", "videos"],
            description: "Share Video",
            validate: {
                payload: VideoValidator.shareVideo,
                headers: UserValidator.jwtValidator
            }
        }
    })
}