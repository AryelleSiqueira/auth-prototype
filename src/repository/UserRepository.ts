import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

export interface IUserRepository {
  getById(id: number): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  delete(id: number): Promise<void>;
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
}