/* eslint-disable import/no-cycle */
import express from 'express';
import AuthenticationController from '../Controllers/AuthenticationController';
import { AuthenticationService } from '../Service/AuthenticationService';
import { iocContainer as Container } from '../Config/container';
import { IAuthenticationService } from '../Interfaces/IAuthenticationService';
import { TYPES } from '../Config/types';

const router = express.Router();
const authService = Container.get<IAuthenticationService>(TYPES.AuthenticationService);
const authController = new AuthenticationController(authService);

router.post('/register', (req, res) =>authController.registerAccount(req, res));

export default router;
