import { Router } from "express";
import testRouter from "./test/test.router";
import peopleRouter from "./people/people.router";

export default (): Router => {
    const app = Router();
    app.use('/test', testRouter());
    app.use('/people', peopleRouter())
    return app;
};