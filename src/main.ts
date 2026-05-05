import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

// Error handler
app.use((err: ApiError, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    // eslint-disable-next-line no-console
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            // eslint-disable-next-line no-console
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            // eslint-disable-next-line no-console
            console.log("Database available!!!");
        } catch {
            // eslint-disable-next-line no-console
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server listening on ${config.PORT}`);
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
};

void start();
