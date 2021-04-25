import { Application } from 'express'
import { UserController } from '../controllers/user.controller'
import { Middleware } from '../middlewares'
import { userValidation } from '../validators'

export class UserRoutes extends Middleware {
<<<<<<< HEAD
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
=======
	public userController: UserController = new UserController()
	public preRoutes: string
	constructor(preRoutes) {
		super()
		this.preRoutes = preRoutes
	}

	public routes = (app: Application) => {
		app.route(`${this.preRoutes}/login`).post(userValidation.normalLogin, this.valid, this.userController.normallogin)

		app.route(`${this.preRoutes}/signup`).post(userValidation.createUser, this.valid, this.userController.normalsignup)
>>>>>>> 2e097cc154e45f1158acd6fff60bc04d20a14210

		app
			.route(`${this.preRoutes}/social-signup`)
			.post(userValidation.social, this.valid, this.userController.socialSignup)

		app
			.route(`${this.preRoutes}/check-username`)
			.get(userValidation.checkUserName, this.valid, this.userController.checkUserName)

		app
			.route(`${this.preRoutes}/update-profile`)
			.post(userValidation.updateUser, this.valid, this.Auth, this.userController.updateUser)
	}
}
