import express from "express";
import { NewAccountUser } from "../Types/User";
import multer from "multer";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";
import path from "path";

export default class AuthenticationController extends globalSuccessHandler {
  private _authService: IAuthenticationService;

  constructor(authService: IAuthenticationService) {
    super();
    this._authService = authService;
  }

  async registerAccount(req: express.Request, res: express.Response) {
    try {
      console.log("inside controller");
      const {
        firstName,
        lastName,
        profilePic,
        idProof,
        mobileNo,
        emailId,
        password,
        status,
        salt,
      } = req.body;

      const newUser: NewAccountUser = {
        firstName,
        lastName,
        profilePic:"",
        idProof:"",
        mobileNo,
        emailId,
        password,
        status,
        salt: "",
      };

      let file;
      // let fileName;
      for (const key in req.files) {
        file = req.files[key];
        //console.log("file", file);
        if(Array.isArray(file)){
          const fileUrl = file.map((f)=>{
            return `D:/Ticket-Reservation/Ticket-Resevation/src/public/${f.filename}`;
          });   

          if(key === 'profilePic'){
            newUser.profilePic = fileUrl.join(", ");
          }else if(key === 'idProof'){
            newUser.idProof = fileUrl.join(", ");
          }
        }
      }

      console.log("new user", newUser);

      const account = await this._authService.registerUser(newUser);

      console.log("account", account);

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

  async loginAccount(req: express.Request, res: express.Response) {
    try {
      const { emailId, password } = req.body;
      console.log("req.body", req.body);
      const login = this._authService.loginAccount(emailId, password);
      this.sendJsonResponse(
        res,
        "Login sucessfully!",
        {
          length: 1,
        },
        login
      );
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }

  async refreshToken(req: express.Request, res: express.Response) {
    try {
      const { userId, refreshToken } = req.body;
      const token = this._authService.refreshToken(userId, refreshToken);
      this.sendJsonResponse(res, null, { size: 1 }, { token });
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }
}
