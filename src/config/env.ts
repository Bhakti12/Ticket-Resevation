import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    DB : process.env.DB,
    API_ROOT: `${process.env.API_ROOT}/v${process.env.VERSION}`,
    ACCESS_TOKEN_KEY : process.env.ACCESS_TOKEN_KEY!,
    REFRESH_TOKEN_KEY : process.env.REFRESH_TOKEN_KEY!,
    ACCESS_TOKEN_EXPIRES_IN : process.env.ACCESS_TOKEN_EXPIRES_IN!,
    REFRESH_TOKEN_EXPIRES_IN : process.env.REFRESH_TOKEN_EXPIRES_IN!,
    KEY : process.env.KEY!,
    IV : process.env.IV!,
    ALLOW_CORS_DOMAIN : process.env.ALLOW_CORS_DOMAIN,
}