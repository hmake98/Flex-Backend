"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_route_1 = require("./routes/user.route");
class App {
    constructor() {
        this.user = new user_route_1.UserRoutes();
        this.initilizeMiddlewares = () => {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use(cors_1.default());
            this.app.use(helmet_1.default());
            this.app.use(morgan_1.default("dev"));
        };
        this.initilizeErrorHandler = () => {
            this.app.use((req, res, next) => {
                const error = new Error(`${req.originalUrl} not found.`);
                error.statusCode = 404;
                error.data = {};
                next(error);
            });
            this.app.use((error, req, res, next) => {
                var _a, _b, _c;
                console.log(error);
                if (error === null || error === void 0 ? void 0 : error.original) {
                    error.message = ((_a = error.original) === null || _a === void 0 ? void 0 : _a.detail) || ((_b = error.original) === null || _b === void 0 ? void 0 : _b.routine) || "db error.";
                    error.data = ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.length) > 0 ? error.errors.filter((e) => delete e.instance) : [];
                }
                return res.status(error.statusCode || 500).json({
                    status: false,
                    message: error.message || "",
                    value: error.data || {}
                });
            });
        };
        this.app = express_1.default();
        this.initilizeMiddlewares();
        this.user.routes(this.app);
        this.initilizeErrorHandler();
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map