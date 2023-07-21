import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

export interface IUserRepository {
  getById(id: number): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  createExampleUsers(): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async getById(id: number): Promise<User | undefined> {
      return await this.repository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { email: email } });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async createExampleUsers(): Promise<void> {
    if (!await this.getByEmail("aluno@um.com")) {
      console.log("Creating example users...");
      const user = new User();
      user.email = "aluno@um.com";
      user.name = "Aluno Um";
      await this.save(user);
  
      const user2 = new User();
      user2.email = "aluno@dois.com";
      user2.name = "Aluno Dois";
      await this.save(user2);

      console.log("Example users created");
    }
  }
}