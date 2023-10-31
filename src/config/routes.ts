import express from "express";
import { config } from "./env";
import testRoute from "../Route/TestRoute";

const appRoute = express.Router();

appRoute.use(`${config.API_ROOT}/test`,testRoute);

export default appRoute;