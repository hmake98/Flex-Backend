import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { UserRoutes } from './routes/user.route';
import { PostRoutes } from './routes/post.route';

class App {
    public app: Application;
    public preRoutes: string = '/api';
    
    public user: UserRoutes = new UserRoutes(`${this.preRoutes}/user`);
    public post: PostRoutes = new PostRoutes(`${this.preRoutes}/post`);

    constructor() {
        this.app = express();
        this.initilizeMiddlewares();
        this.user.routes(this.app);
        this.post.routes(this.app);
        this.initilizeErrorHandler();
    }


    private initilizeMiddlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
    }

    private initilizeErrorHandler = () => {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error: any = new Error(`${req.originalUrl} not found.`);
            error.statusCode = 404;
            error.data = {}
            next(error);
        });
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            console.log(error)
            if (error?.original) {
                error.message = error.original?.detail || error.original?.routine || "db error.";
                error.data = error?.errors?.length > 0 ? error.errors.filter((e: any) => delete e.instance) : []
            }
            return res.status(error.statusCode || 500).json({
                status: false,
                message: error.message || "",
                value: error.data || {}
            })
        });
    }
}

declare global {
    namespace Express {
        export interface Request {
            files: any;
            user: {
                _id: any,
                email: string,
                userName: string
            };
        }
    }
}

export default new App().app;