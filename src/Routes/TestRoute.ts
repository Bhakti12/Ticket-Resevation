/* eslint-disable import/no-cycle */
import express from 'express';
import TestController from '../Controllers/TestController';
import { TestService } from '../Service/TestService';
import { iocContainer as Container } from '../Config/container';
import { ITestService } from '../Interfaces/ITestService';
import { TYPES } from '../Config/types';

const router = express.Router();
const testService = Container.get<ITestService>(TYPES.TestService);
const testController = new TestController(testService);

router.get('/', (req, res) => testController.testMethod(req, res));

export default router;
