import express from "express";
import { config } from "./env";
import testRoute from "../Routes/TestRoute";

const appRoute = express.Router();

appRoute.use(`${config.API_ROOT}/test`,testRoute);

export default appRoute;