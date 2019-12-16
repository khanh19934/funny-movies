import SocketController from "./socket.controller";
import {IServerConfigurations} from "../../configs";
import {IDatabase} from "../../database";

export const init = (config: IServerConfigurations, io: any, database: IDatabase) => {
    return new SocketController(config, io, database)
}