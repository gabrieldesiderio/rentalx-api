import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm";

import { User } from "../entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ id, name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository }