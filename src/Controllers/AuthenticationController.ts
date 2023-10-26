import express from "express";
import { NewAccountUser } from "../Types/User";
import multer from "multer";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";

export default class AuthenticationController extends globalSuccessHandler {
  private _authService: IAuthenticationService;

  constructor(authService: IAuthenticationService) {
    super();
    this._authService = authService;
  }

  async registerAccount(req: express.Request, res: express.Response) {
    try {
      const {
        firstName,
        lastName,
        profilePic,
        idProof,
        mobileNo,
        emailId,
        password,
      } = req.body;

      const newUser: NewAccountUser = {
        firstName,
        lastName,
        profilePic: req.file ? (req.file as any).location : null,
        idProof: req.file ? (req.file as any).location : null,
        mobileNo,
        emailId,
        password,
      };

      console.log("new user",newUser);

      const account = await this._authService.registerUser(
        newUser
      );

      console.log("account",account);

      return this.sendJsonResponse(
        res,
        "Account created successfully",
        {
          length: 1,
        },
        account
      );
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }
}
