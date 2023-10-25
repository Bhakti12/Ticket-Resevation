import express, { Application } from "express";
import { config } from "./Config/env";
import bodyParser, { json } from "body-parser";
import { DatabaseConnection } from "./Config/db";

const port = config.PORT;

const app:Application = express();

app.use(json());
app.use(bodyParser.urlencoded({extended : false}));

//console.log("executing database");
DatabaseConnection();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});