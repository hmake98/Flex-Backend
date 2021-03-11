"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
class UserRoutes extends middlewares_1.Middleware {
    constructor() {
        super();
        this.userController = new user_controller_1.UserController();
        this.routes = (app) => {
            app.route('/user/login')
                .post(validators_1.userValidation.normalLogin, this.valid, this.userController.normallogin);
            app.route('/user/signup')
                .post(validators_1.userValidation.createUser, this.valid, this.userController.normalsignup);
            app.route('/user/social-signup')
                .post(validators_1.userValidation.social, this.valid, this.userController.socialSignup);
            app.route('/user/social-signin')
                .post(validators_1.userValidation.social, this.valid, this.userController.socialSignin);
            app.route('/user/forgot-password')
                .post(validators_1.userValidation.createUser, this.valid, this.userController.forgotPassword);
            app.route('/user/update-profile')
                .post(validators_1.userValidation.createUser, this.valid, this.userController.updateUser);
        };
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.route.js.map