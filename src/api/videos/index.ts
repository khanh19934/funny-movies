import * as Hapi from "hapi"

import Routes from "./videos.route"
import {IDatabase} from "../../database"
import {IServerConfigurations} from "../../configs"

export const init = (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) => {
    Routes(server, configs, database)
}