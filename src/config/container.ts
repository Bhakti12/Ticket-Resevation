import { Container } from "inversify";
import "reflect-metadata";
import { buildProviderModule } from "inversify-binding-decorators";
import { ITestRepository } from "../Interface/ITestRepo";
import { TYPES } from "./types";
import { TestRepository } from "../Repository/TestRepo";
import { ITestService } from "../Interface/ITestService";
import { TestService } from "../Service/TestService";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import { AuthenticationRepository } from "../Repository/AuthenticationRepo";
import { IAuthenticationService } from "../Interface/IAuthenticationService";
import { AuthenticationService } from "../Service/AuthenticationService";
import { IRoleRepository } from "../Interface/IRoleRepo";
import roleRepository from "../Repository/RoleRepository";
import { IRoleService } from "../Interface/IRoleService";
import roleService from "../Service/RoleService";
import { IJwtService } from "../Interface/IJwtService";
import jwtService from "../Service/jwtService";

const iocContainer = new Container();

iocContainer.load(buildProviderModule());
iocContainer.bind<ITestRepository>(TYPES.TestRepository).to(TestRepository);
iocContainer.bind<ITestService>(TYPES.TestService).to(TestService);

iocContainer.bind<IAuthenticationRepository>(TYPES.AuthenticationRepository).to(AuthenticationRepository);
iocContainer.bind<IAuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);

iocContainer.bind<IRoleRepository>(TYPES.RoleRepository).to(roleRepository);
iocContainer.bind<IRoleService>(TYPES.RoleService).to(roleService);

iocContainer.bind<IJwtService>(TYPES.JwtService).to(jwtService);
export {iocContainer};