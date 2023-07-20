import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "root",
    database: process.env.DB_NAME ? process.env.DB_NAME : "boca-ex",
    insecureAuth : true,
    synchronize: true,
    logging: false,
    entities: [User],
});

