import * as Server from "./server"
import * as Configs from "./configs"
import * as Database from "./database";

const start = async ({ config, db }): Promise<any> => {
    try {
        const server = await Server.init(config, db);
        await server.start();
        console.log("Server running at:", server.info.uri);
    } catch (err) {
        console.error("Error starting server: ", err.message);
        throw err;
    }
};

const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

const serverConfigs = Configs.getServerConfigs();

start({ config: serverConfigs, db: database }).then();

