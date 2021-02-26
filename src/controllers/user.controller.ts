import { Request, Response, NextFunction } from 'express'
import { Responses } from '../utils/Response'

export class UserController extends Responses {
	public normallogin = (req: Request, res: Response, next: NextFunction) => {

	}

	public normalsignup = (req: Request, res: Response, next: NextFunction) => {

	}

	public socialSignup = (req: Request, res: Response, next: NextFunction) => {

	}

	public socialSignin = (req: Request, res: Response, next: NextFunction) => {

	}

	public forgotPassword = (req: Request, res: Response, next: NextFunction) => {

	}

	public updateUser = (req: Request, res: Response, next: NextFunction) => {

	}
}


// return this.failed(res, {}, USER.ALREADY_REGISTERED, 200)
// this.success(res, { user: updatedUser, auth: tokens });
