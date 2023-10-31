import express, { Application } from "express";
import { config } from "./Config/env";
import bodyParser, { json } from "body-parser";
import { DatabaseConnection } from "./Config/db";
import IndexRouter from "./Route/IndexRouter";
//import appRoute from "./Config/routes";
import "reflect-metadata";

const port = config.PORT;

const app:Application = express();

const allowlist: any[string] = config.ALLOW_CORS_DOMAIN;


app.use(json());
app.use(bodyParser.urlencoded({extended : false}));

//console.log("executing database");
DatabaseConnection();

app.use(IndexRouter.testRoute,IndexRouter.authRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});