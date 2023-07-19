import { container } from "tsyringe";

import { ExampleController } from "../controller/ExampleController";
import { IUserRepository, UserRepository } from "../repository/UserRepository";
import { LDAPAuthenticator } from "../auth/LDAPAuthenticator";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<LDAPAuthenticator>(
    "LDAPConnector",
    LDAPAuthenticator
);

container.registerSingleton<ExampleController>(
    "ExampleController",
    ExampleController
);
