import * as Hapi from "hapi";

import {IServerConfigurations} from "./configs";
import {IDatabase} from "./database";
import * as User from "./api/users"
import * as Videos from "./api/videos"
import {IPlugin} from "./plugins/interface";
import * as SocketIO from "./api/sockets"
const jwtAuth = require('socketio-jwt-auth');

const registerRouter = [User, Videos]

const init = async (configs: IServerConfigurations, database: IDatabase): Promise<Hapi.Server> => {
    try {
        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server({
            debug: {request: ['error']},
            port: port,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });
        const io = require('socket.io')(server.listener)
        io.use(jwtAuth.authenticate({
            secret: configs.jwtSecret,
            algorithm: 'HS256',
            succeedWithoutToken: true


        }, function (payload, done) {
            done(null, payload.id)

        }))

        SocketIO.init(configs, io, database).initSocket()

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }

        const plugins: Array<string> = configs.plugins;

        const pluginOptions = {
            database: database,
            serverConfigs: configs
        };

        let pluginPromises: Promise<any>[] = [];

        plugins.forEach((pluginName: string) => {
            let plugin: IPlugin = require("./plugins/" + pluginName).default();
            console.log(
                `Register Plugin ${plugin.info().name} v${plugin.info().version}`
            );
            pluginPromises.push(plugin.register(server, pluginOptions));
        });

        await Promise.all(pluginPromises);

        console.log("All plugins registered successfully.");

        registerRouter.forEach(route => {
            route.init(server, configs, database)
        })

        return new Promise<Hapi.Server>(resolve => {
            resolve(server)
        });

    } catch (err) {
        console.log("Error starting server: ", err);
        throw err;
    }
}

export {init}