import { Router } from "express";
import { authenticateToken } from '../auth/JWTAuthentication';
import { ExampleController } from "../controller/ExampleController";
import { container } from "tsyringe";

const exampleRoutes = Router();
const controller = container.resolve(ExampleController);

exampleRoutes.post('/login', controller.login);

exampleRoutes.get('/protected', authenticateToken, controller.protectedResource);

export { exampleRoutes };