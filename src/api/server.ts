import Koa from "koa";
import koaBody from "koa-body";
import koaCors from "@koa/cors";
import { errorHandler } from "./errorHandler";
import { appconfig } from "@/configs/appconfig";
import { combinedRouter } from "./routes";

const { port } = appconfig;

export const koa = new Koa();

export const startServer = () => {
    koa.use(koaCors());
    koa.use(errorHandler);
    koa.use(koaBody());

    koa.use(combinedRouter());

    koa.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
};
