import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/validator";
import { getCount, allow } from "./people.controller";
import { paramsIdSchema } from "./people.schema";

export default (): Router => {
    const app = Router();
    app.get("/count/:id", validateRequest("params", paramsIdSchema), getCount);
    app.get("/allow/:id", validateRequest("params", paramsIdSchema), allow);
    return app;
};