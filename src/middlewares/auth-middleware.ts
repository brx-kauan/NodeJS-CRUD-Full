import { Request, Response, NextFunction } from "express"
import { prisma } from "prismaConn"
import jwt, { JwtPayload } from "jsonwebtoken"
// enum
import { EStatusErrors } from "enum/status-errors.enum"

export class AuthMiddleware {
	public static async verifyJWT(req: Request, res: Response, next: NextFunction) {
		const authHeaders = req.headers["authorization"]
		const token = authHeaders && authHeaders.split(" ")[1]

		if (!token) {
			return res.status(401).json({
				message: "Token Missing.",
			})
		}

		try {
			jwt.verify(token, `${process.env.JWT_TOKEN_SECRET}`)
		} catch (error) {
			return res.status(401).json({
				message: EStatusErrors.E401,
			})
		}

		const decode = jwt.decode(token) as JwtPayload
		const payLoadUserId = decode.id

		const findUser = await prisma.user.findUnique({
			where: {
				id: payLoadUserId,
			},
		})

		if (!findUser) {
			return res.status(404).json({
				message: EStatusErrors.E404,
			})
		}

		const reqId = req.params.id
		if (reqId != findUser.id) {
			return res.status(401).json({
				message: EStatusErrors.E401,
			})
		}
		next()
	}
}
