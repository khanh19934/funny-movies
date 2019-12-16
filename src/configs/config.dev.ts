interface IServerConfigurations {
  port: number;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
  plugins: string[]
}
export interface IConfig {
  database: {
    connectionString: string
  },
  server: IServerConfigurations
}
const config: IConfig = {
  "database": {
    "connectionString": "mongodb://localhost:27017/funny-movie-dev"
  },
  "server": {
    "port": 5000,
    "jwtSecret": "random-secret-password",
    "jwtExpiration": "0.1h",
    "routePrefix": "",
    "plugins": ["jwt-auth"]
  }
}
export default config