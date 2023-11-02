/* eslint-disable import/no-cycle */
import express from "express";
import { iocContainer as Container } from "../Config/container";
import { IAuthenticationService } from "../Interface/IAuthenticationService";
import { TYPES } from "../Config/types";
import adminController from "../Controller/AdminController";
import passport from "../Config/passport";
import { IAdminService } from "../Interface/IAdminService";

const router = express.Router();
const authService = Container.get<IAuthenticationService>(
  TYPES.AuthenticationService
);
const adminService = Container.get<IAdminService>(TYPES.AdminService);
const AdminController = new adminController(authService, adminService);

router.get(
  "/get-all-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => AdminController.getAllUser(req, res)
);

router.put(
  "/user-status-change",
  passport.authenticate("jwt", { session: false }),
  (req, res) => AdminController.changeUserStatus(req, res)
);

router.get(
  "/get-events",
  passport.authenticate("jwt", { session: false }),
  (req,res) => AdminController.getAllEvents(req,res)
);

export default router;