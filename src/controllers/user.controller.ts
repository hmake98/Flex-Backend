import { Request, Response, NextFunction } from 'express'
import { Responses } from '../utils/Response'
import { USER } from './../utils/messages';
import {
	checkPassword,
	generatePassword,
	generate_tokens,
	uploadToS3Bucket
} from './../utils/helper';
import logger from '../services/logger.service'
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class UserController extends Responses {
	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				username,
				password
			} = req.body

			const exist_user = await getRepository(User).findOne({ username })
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
			logger.error('[normallogin]', error)
		}
	}

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				email,
				password,
				username,
			} = req.body;

			const exist_user = await getRepository(User).findOne({ username })

			if (exist_user) {
				return this.failed(res, {}, USER.ALREADY_REGISTERED, 400)
			}

			const hashPass = await generatePassword(password);

			const user = getRepository(User).create({
				email,
				username,
				password: hashPass,
				isActive: true,
			})

			const createdUser = getRepository(User).save(user);

			const token = generate_tokens(createdUser);

			// @ts-ignore
			delete createdUser.password;

			this.success(res, { user: createdUser, auth: token });
		} catch (error) {
			logger.error('[normalsignup]', error)
		}
	}

	public socialSignup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				provider,
				socialId,
				username
			} = req.body

			const exist_user = await getRepository(User).findOne({ social_id: socialId })

			if (exist_user) {
				const token = generate_tokens(exist_user);
				// @ts-ignore
				delete createdUser.password;
				this.success(res, { user: exist_user, auth: token });
			}

			const user = getRepository(User).create({
				username,
				isActive: true,
				provider,
				social_id: socialId
			})

			const createdUser = getRepository(User).save(user);

			const token = generate_tokens(createdUser);
			// @ts-ignore
			delete createdUser.password;

			this.success(res, { user: createdUser, auth: token });
		} catch (error) {
			logger.error('[socialSignup]', error)
		}
	}

	public checkUserName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				username
			} = req.body;

			const check = await getRepository(User).findOne({ username });

			if (!check) {
				return this.failed(res, {}, USER.FOUND, 200, true);
			}

			this.success(res, {}, USER.NOT_FOUND, 200, true);
		} catch (error) {
			console.log(error)
			logger.error('[checkUserName]', error)
		}
	}

	public updateUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				email,
				password,
				username,
				firstname,
				lastname,
			} = req.body;

			const { profilePic } = req.files

			const fileUpload = await uploadToS3Bucket({
				bucketPath: 'user-profile-pics', file: profilePic
			})

			const updatedUser = await getRepository(User).update(
				req.user.id,
				{
					email,
					password,
					username,
					firstname,
					lastname,
					profile_pic: fileUpload
				}
			)

			this.success(res, { user: updatedUser });
		} catch (error) {
			logger.error('[updateUser]', error)
		}
	}
}

