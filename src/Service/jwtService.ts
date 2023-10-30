import { IJwtService } from "../Interfaces/IJwtService";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { userToken } from "../Types/User";

@injectable()
export default class jwtService implements IJwtService {
  async generateToken(
    data : userToken,
    secret: string,
    expiresIn: string
  ): Promise<string> {

    return await jwt.sign(
      {
        data
      },
      secret,
      {
        expiresIn,
      }
    );
  }

  async verifyToken(token: string, secret: string): Promise<string | object> {
    const payload = <userToken>jwt.verify(token,secret);
    payload.userId;
    return payload;
  }
}