/* eslint-disable import/no-cycle */
import express from 'express';
import { iocContainer as Container } from '../Config/container';
import { TYPES } from '../Config/types';
import { IRoleService } from '../Interface/IRoleService';
import RoleController from '../Controller/RoleController';

const router = express.Router();
const roleService = Container.get<IRoleService>(TYPES.RoleService);
const roleController = new RoleController(roleService);

router.get('/add-role', (req, res) => roleController.addRole(req, res));

export default router;