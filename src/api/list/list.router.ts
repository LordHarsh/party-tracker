import { Router } from "express";
import { getList, listAllow, listDeny, getAll } from "./list.controller";
import { validateRequest } from "../../shared/middlewares/validator";
import { listSchema } from "./list.schema";

export default (): Router => {
    const app = Router();
    app.get('/', getList);
    app.get('/all', getAll);
    app.post('/allow', validateRequest('body', listSchema), listAllow);
    app.post('/deny', validateRequest('body', listSchema), listDeny);
    return app;
}