import devConfigs, {IConfig} from "./config.dev"

export const configs: IConfig | any = process.env.NODE_ENV === 'development' ? devConfigs : {}

export interface IServerConfigurations {
    port: number;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
    plugins: string[]
}

export interface IDataConfiguration {
    connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration  {
    return configs.database
}

export function getServerConfigs(): IServerConfigurations {
    return configs.server
}

