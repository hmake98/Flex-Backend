import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan, { StreamOptions } from 'morgan';
import { UserRoutes } from './routes/user.route';
import logger from './services/logger.service';
import { createConnection } from "typeorm";
import { db } from './configs/keys';

class App {
    public app: Application;
    public user: UserRoutes = new UserRoutes();

    constructor() {
        this.app = express();
        this.initilizeMiddlewares();
        this.user.routes(this.app);
        this.initilizeErrorHandler();
    }

    private initilizeMiddlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());

        const stream: StreamOptions = {
            write: (message) => logger.http(message),
        };

        // Build the morgan middleware
        const morganMiddleware = morgan(
            ':method :url :status :res[content-length] - :response-time ms',
            { stream }
        );

        this.app.use(morganMiddleware);
    }

	private initilizeErrorHandler = () => {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			const error: any = new Error(`${req.originalUrl} not found.`)
			error.statusCode = 404
			error.data = {}
			next(error)
		})
		this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
			console.log(error)
			if (error?.original) {
				error.message = error.original?.detail || error.original?.routine || 'db error.'
				error.data = error?.errors?.length > 0 ? error.errors.filter((e: any) => delete e.instance) : []
			}
			return res.status(error.statusCode || 500).json({
				status: false,
				message: error.message || '',
				value: error.data || {},
			})
		})
	}
}

declare global {
    namespace Express {
        export interface Request {
            files: any;
            user: {
                id: number,
                email: string,
                userName: string
            };
        }
    }
}

export default new App().app;

