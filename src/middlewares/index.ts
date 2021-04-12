import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { token } from '../configs/keys'
import { VALIDATION, ERRORS, USER } from '../utils/messages'
import { User } from '../models/User'

export class Middleware {
	constructor() {}

	public valid = (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req)
			if (errors.isEmpty()) return next()
			const error: any = new Error(VALIDATION.VALIDATION_ERROR)
			error.statusCode = 200
			error.data = errors.array()
			next(error)
		} catch (error) {
			next(error)
		}
	}

	public Auth = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let authorization = req.headers['authorization']
			if (!authorization) throw new Error(ERRORS.MISSING_HEADER)
			let accessToken = authorization.split(' ')[1]
			if (!accessToken) throw new Error(ERRORS.UNAUTH_ACCESS)
			let decode: any = verify(accessToken, token.ACCESS_TOKEN)
			const foundUser: any = 'query'
			await User.findOne({ where: { id: decode.id } })
			if (!foundUser) {
				const error: any = new Error(USER.NOT_FOUND)
				error.statusCode = 401
				return next(error)
			}
			// @ts-ignore
			req['user'] = foundUser
			next()
		} catch (error) {
			error.statusCode = 401
			next(error)
		}
	}

	public RefreshAuth = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let authorization = req.headers['authorization']
			if (!authorization) throw new Error(ERRORS.MISSING_HEADER)
			let accessToken = authorization.split(' ')[1]
			if (!accessToken) throw new Error(ERRORS.UNAUTH_ACCESS)
			let decode: any = verify(accessToken, token.REFRESH_TOKEN)
			const foundUser: any = 'query'
			await User.findOne({ where: { id: decode.id } })
			if (!foundUser) {
				const error: any = new Error(USER.NOT_FOUND)
				error.statusCode = 401
				return next(error)
			}
			// @ts-ignore
			req['user'] = foundUser
			next()
		} catch (error) {
			error.statusCode = 401
			next(error)
		}
	}
}
