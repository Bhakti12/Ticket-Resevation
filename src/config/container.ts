import { Container } from "inversify";
import "reflect-metadata";
import { buildProviderModule } from "inversify-binding-decorators";
import { ITestRepository } from "../Interfaces/ITestRepo";
import { TYPES } from "./types";
import { TestRepository } from "../Repository/TestRepo";
import { ITestService } from "../Interfaces/ITestService";
import { TestService } from "../Service/TestService";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { AuthenticationRepository } from "../Repository/AuthenticationRepo";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";
import { AuthenticationService } from "../Service/AuthenticationService";
import { IRoleRepository } from "../Interfaces/IRoleRepo";
import roleRepository from "../Repository/RoleRepository";
import { IRoleService } from "../Interfaces/IRoleService";
import roleService from "../Service/RoleService";

const iocContainer = new Container();

iocContainer.load(buildProviderModule());
iocContainer.bind<ITestRepository>(TYPES.TestRepository).to(TestRepository);
iocContainer.bind<ITestService>(TYPES.TestService).to(TestService);

iocContainer.bind<IAuthenticationRepository>(TYPES.AuthenticationRepository).to(AuthenticationRepository);
iocContainer.bind<IAuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);

iocContainer.bind<IRoleRepository>(TYPES.RoleRepository).to(roleRepository);
iocContainer.bind<IRoleService>(TYPES.RoleService).to(roleService);
export {iocContainer};