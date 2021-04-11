import { Application } from 'express';
import { PostController } from '../controllers/post.controller';
import { Middleware } from '../middlewares';
import { postValidation } from '../validators'

export class PostRoutes extends Middleware {
    public postController: PostController = new PostController();
    public preRoutes: string;
    constructor(preRoutes) {
        super()
        this.preRoutes = preRoutes
    }

    public routes = (app: Application) => {
        app.route(`${this.preRoutes}/`)
            .get(this.valid, this.postController.getPosts);
        app.route(`${this.preRoutes}/create`)
            .post(postValidation.createPost, this.valid, this.postController.createPost);
        app.route(`${this.preRoutes}/edit`)
            .put(postValidation.editPost, this.valid, this.postController.editPost);
        app.route(`${this.preRoutes}/delete`)
            .delete(this.valid, this.postController.deletePost);
    }
}