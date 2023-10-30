/* eslint-disable import/no-cycle */
import express from "express";
import AuthenticationController from "../Controllers/AuthenticationController";
import { AuthenticationService } from "../Service/AuthenticationService";
import { iocContainer as Container } from "../Config/container";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";
import { TYPES } from "../Config/types";
import registerUser from "../Validators/register-User-Validator";
import upload from "../Config/storageConfig";
import loginUser from "../Validators/loginValidator";

const router = express.Router();
const authService = Container.get<IAuthenticationService>(
  TYPES.AuthenticationService
);
const authController = new AuthenticationController(authService);

router.post(
  "/register",
  registerUser,
  (req, res) => authController.registerAccount(req, res)
);

router.post(
  "/login",
  loginUser,
  (req,res) => authController.loginAccount(req,res)
);

router.get(
  "/getToken",
  (req,res) => authController.refreshToken(req,res)
);

export default router;