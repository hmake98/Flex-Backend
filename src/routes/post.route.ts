import { Application } from 'express';
import { PostController } from '../controllers/post.controller';
import { Middleware } from '../middlewares';
import { postValidation } from '../validators'

export class PostRoutes extends Middleware {
    public userController: PostController = new PostController();
    constructor() { super() }

    public routes = (app: Application) => {

    }
}