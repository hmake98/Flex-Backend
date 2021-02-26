import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import logger from '../services/logger.service'
import { Responses } from '../utils/Response'
import { USER } from './../utils/messages';
import { checkPassword, generatePassword, generate_tokens } from './../utils/helper';

export class UserController extends Responses {
	public normallogin = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				userName,
				password
			} = req.body

			const exist_user = await User.findOne({ userName })
			if (!exist_user) {
				return this.failed(res, {}, USER.NOT_FOUND, 400)
			}

			const check_password = await checkPassword(exist_user.password, password);
			if (!check_password) {
				return this.failed(res, {}, USER.PASSWORD_INCORRECT, 401)
			}

			const token = generate_tokens(exist_user);

			this.success(res, { user: exist_user, auth: token });
		} catch (error) {
			console.log(error)
			logger.error('[normallogin]', error)
		}
	}

	public normalsignup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				email,
				password,
				firstName,
				lastName,
				userName,
				dateOfBirth,
			} = req.body;

			const exist_user = await User.findOne({ userName })

			if (exist_user) {
				return this.failed(res, {}, USER.ALREADY_REGISTERED, 400)
			}

			const hashPass = await generatePassword(password);

			const createUser = new User({
				email,
				password: hashPass,
				firstName,
				lastName,
				userName,
				dateOfBirth,
			})

			const createdUser = await createUser.save();

			const token = generate_tokens(createdUser);

			// @ts-ignore
			delete createdUser.password;

			this.success(res, { user: createdUser, auth: token });
		} catch (error) {
			console.log(error)
			logger.error('[normalsignup]', error)
		}
	}

	public socialSignup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				firstName,
				lastName,
				provider,
				socialId,
				userName
			} = req.body

			const exist_user = await User.findOne({ socialId })

			if (exist_user) {
				const token = generate_tokens(exist_user);
				// @ts-ignore
				delete createdUser.password;
				this.success(res, { user: exist_user, auth: token });
			}

			const createUser = new User({
				firstName,
				lastName,
				provider,
				socialId,
				userName
			})

			const createdUser = await createUser.save();

			const token = generate_tokens(createdUser);
			// @ts-ignore
			delete createdUser.password;

			this.success(res, { user: createdUser, auth: token });
		} catch (error) {
			console.log(error)
			logger.error('[socialSignup]', error)
		}
	}

	public checkUserName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				userName
			} = req.body;

			const check = await User.findOne({ userName });

			if (check) {
				return this.failed(res, {}, USER.FOUND, 400)
			}

			this.success(res, {});
		} catch (error) {
			console.log(error)
			logger.error('[checkUserName]', error)
		}
	}

	public socialSignin = (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {
			console.log(error)
			logger.error('[socialSignin]', error)
		}
	}

	public forgotPassword = (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {
			console.log(error)
			logger.error('[forgotPassword]', error)
		}
	}

	public updateUser = (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {
			console.log(error)
			logger.error('[updateUser]', error)
		}
	}
}


// return this.failed(res, {}, USER.ALREADY_REGISTERED, 200)
// this.success(res, { user: updatedUser, auth: tokens });
