import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    DB : process.env.DB,
    API_ROOT: `${process.env.API_ROOT}/v${process.env.VERSION}`
}