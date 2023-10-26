import { Container } from "inversify";
import "reflect-metadata";
import { buildProviderModule } from "inversify-binding-decorators";
import { ITestRepository } from "../Interfaces/ITestRepo";
import { TYPES } from "./types";
import { TestRepository } from "../Repository/TestRepo";
import { ITestService } from "../Interfaces/ITestService";
import { TestService } from "../Service/TestService";

const iocContainer = new Container();

iocContainer.load(buildProviderModule());
iocContainer.bind<ITestRepository>(TYPES.TestRepository).to(TestRepository);
iocContainer.bind<ITestService>(TYPES.TestService).to(TestService);

export {iocContainer};