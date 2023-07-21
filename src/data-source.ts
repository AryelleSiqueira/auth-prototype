import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { IUserRepository } from "./repository/UserRepository";
import { container } from "tsyringe";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
    username: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "root",
    database: process.env.DB_NAME ? process.env.DB_NAME : "boca_ex",
    synchronize: true,
    logging: false,
    entities: [User],
});

export async function initializeDB(maxAttempts: number, interval: number) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const ds = await AppDataSource.initialize();
      await ds.synchronize();

      const userRepository = container.resolve<IUserRepository>("UserRepository");
      await userRepository.createExampleUsers();

      console.log("Connected to database successfully");
      return;
    } catch (err) {
      attempts++;
      console.log(`Database connection attempt ${attempts} failed`);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
  console.error("Max attempts reached. Database connection failed.");
  process.exit(1);
}
