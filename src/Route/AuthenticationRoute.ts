/* eslint-disable import/no-cycle */
import express from "express";
import AuthenticationController from "../Controller/AuthenticationController";
import { AuthenticationService } from "../Service/AuthenticationService";
import { iocContainer as Container } from "../Config/container";
import { IAuthenticationService } from "../Interface/IAuthenticationService";
import { TYPES } from "../Config/types";
import registerUser from "../Validator/register-User-Validator";
import upload from "../Config/storageConfig";
import loginUser from "../Validator/loginValidator";

const router = express.Router();
const authService = Container.get<IAuthenticationService>(
  TYPES.AuthenticationService
);
const authController = new AuthenticationController(authService);

router.post(
  "/register",
  upload.fields([{name : 'profilePic',maxCount:1},{name : 'idProof',maxCount:1}]),
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