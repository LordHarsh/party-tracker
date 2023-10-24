import { Router } from "express";
import testRouter from "./test/test.router";
import peopleRouter from "./people/people.router";
import authRouter from "./auth/auth.router";
import scanRouter from "./scan/scan.router";
import authenticateToken from "../shared/middlewares/authenticate";
import listRouter from "./list/list.router";

export default (): Router => {
    const app = Router();
    app.use('/auth', authRouter());
    app.use('/scan', authenticateToken(), scanRouter());
    app.use('/list', authenticateToken(), listRouter());
    return app;
};