import "reflect-metadata";

import { Request, Response } from "express";
import { generateToken } from '../auth/JWTAuthentication';
import { LDAPAuthenticator } from "../auth/LDAPAuthenticator";
import { IUserRepository } from "../repository/UserRepository";
import { injectable, container } from "tsyringe";

@injectable()
export class ExampleController {

  async login(req: Request, res: Response): Promise<Response> {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const ldapConnector = container.resolve(LDAPAuthenticator);
    const userRepository = container.resolve<IUserRepository>("UserRepository");

    if (await userRepository.getByEmail(email) && await ldapConnector.authenticate(email, req.body.password)) {
      const token = generateToken({ email });
      return res.json({ token });
    }
    return res.status(401).json({ error: "login failed" });
  }

  async protectedResource(req: Request, res: Response): Promise<Response> {
    const email = req.body.decodedToken.email;

    return res.json({ message: 'Recurso protegido acessado com sucesso! Usuário: ' + email });
  }       
}