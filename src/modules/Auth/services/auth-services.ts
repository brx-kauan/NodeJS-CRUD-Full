import bcrypt from "bcrypt"
import { prisma } from "prismaConn"
import jwt, { JwtPayload } from "jsonwebtoken"

//enum
import { EStatusErrors } from "enum/status-errors.enum"
import { UtilsTokenAuth } from "../utils/utils-auth-jwt"
import { any, array, string } from "zod"
import { error } from "console"

class AuthServices {
	public async login(email: string, password: string) {
		const findUser = await prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				name: true,
				email: true,
				password: true,
			},
		})
		if (!findUser) {
			throw new Error(EStatusErrors.E404)
		}
		const passMatch = await bcrypt.compare(password, findUser.password)
		if (!passMatch) {
			throw new Error(EStatusErrors.E401)
		}

		return UtilsTokenAuth.jwtGenerator(findUser)
	}
	public async token(refreshToken: string) {
		try {
			jwt.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`)
		} catch (error) {
			throw new Error(EStatusErrors.E401)
		}

		const decoded = jwt.decode(refreshToken) as JwtPayload
		const userId = decoded.id

		const findUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				password: true,
			},
		})
		if (!findUser) {
			throw new Error(EStatusErrors.E404)
		}
		return UtilsTokenAuth.jwtGenerator(findUser)
	}
}

export const authServices = new AuthServices()
