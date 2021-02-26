import { Application } from 'express';
import { UserController } from '../controllers/user.controller';
import { Middleware } from '../middlewares';
import { userValidation } from '../validators'

export class UserRoutes extends Middleware {
    public userController: UserController = new UserController();
    constructor() { super() }

    public routes = (app: Application) => {
        app.route('/user/login')
            .post(userValidation.normalLogin, this.valid, this.userController.normallogin);

        app.route('/user/signup')
            .post(userValidation.createUser, this.valid, this.userController.normalsignup);

        app.route('/user/social-signup')
            .post(userValidation.social, this.valid, this.userController.socialSignup);

        app.route('/user/social-signin')
            .post(userValidation.social, this.valid, this.userController.socialSignin);

        app.route('/user/forgot-password')
            .post(userValidation.createUser, this.valid, this.userController.forgotPassword);

        app.route('/user/update-profile')
            .post(userValidation.createUser, this.valid, this.userController.updateUser);
    }
}