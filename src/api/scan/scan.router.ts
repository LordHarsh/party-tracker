import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/validator";
import { scanSchema } from "./scan.schema";
import { scanAllowMore, scanController, scanIgnore } from "./scan.controller";

export default (): Router => {
    const app = Router();
    app.post('/', validateRequest('body', scanSchema), scanController);
    app.post('/allow', validateRequest('body', scanSchema), scanAllowMore);
    app.post('/ignore', validateRequest('body', scanSchema), scanIgnore);
    return app;
};