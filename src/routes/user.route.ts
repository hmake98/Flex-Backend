import { Application } from 'express';
import { UserController } from '../controllers/user.controller';
import { Middleware } from '../middlewares';
import { userValidation } from '../validators'

export class UserRoutes extends Middleware {
    public userController: UserController = new UserController();
    public preRoutes: string;
    constructor() {
        super();
        this.preRoutes = '/api/user'
    }

    public routes = (app: Application) => {
        app.route(`${this.preRoutes}/login`)
            .post(userValidation.normalLogin, this.valid, this.userController.login);

        app.route(`${this.preRoutes}/signup`)
            .post(userValidation.createUser, this.valid, this.userController.signup);

        app.route(`${this.preRoutes}/social-signup`)
            .post(userValidation.social, this.valid, this.userController.socialSignup);

        app.route(`${this.preRoutes}/check-username`)
            .get(userValidation.checkUserName, this.valid, this.userController.checkUserName);

        app.route(`${this.preRoutes}/update-profile`)
            .post(userValidation.updateUser, this.valid, this.Auth, this.userController.updateUser);
    }
}