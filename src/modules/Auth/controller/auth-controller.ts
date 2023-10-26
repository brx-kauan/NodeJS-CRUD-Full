import { Request, Response } from "express"
import { authServices } from "../services/auth-services"
import jwt from "jsonwebtoken"
import z from "zod"
//enum
import { EStatusErrors } from "enum/status-errors.enum"

class AuthController {
	public async login(req: Request, res: Response) {
		const { email, password } = req.body

		try {
			const ZUserSchema = z.object({
				email: z.string().email({ message: EStatusErrors.E400 }),
				password: z.string().min(8, { message: EStatusErrors.E400 }),
			})
			ZUserSchema.parse({ email, password })
		} catch (e: any) {
			return res.status(400).json({
				error: e.errors,
			})
		}

		try {
			return res.status(200).json({
				message: "Login Sucess",
				data: await authServices.login(email, password),
			})
		} catch (e: any) {
			switch (e.message) {
				case EStatusErrors.E401:
					return res.status(401).json({
						error: e.message,
					})
					break
				case EStatusErrors.E404:
					return res.status(404).json({
						error: e.message,
					})
					break
			}
		}
	}

	public async token(req: Request, res: Response) {
		const authHeaders = req.headers["authorization"]
		const token = (authHeaders && authHeaders.split(" ")[1]) || ""
		try {
			const ZAuthSchema = z.object({
				token: z.string().min(20, { message: "Token Missing." }),
			})
			ZAuthSchema.parse({ token })
		} catch (e: any) {
			return res.status(401).json({
				error: e.errors,
			})
		}

		try {
			return res.status(200).json({
				data: await authServices.token(token),
			})
		} catch (e: any) {
			switch (e.message) {
				case EStatusErrors.E401:
					return res.status(401).json({
						error: e.message,
					})
					break
				case EStatusErrors.E404:
					return res.status(404).json({
						error: e.message,
					})
					break
			}
		}
	}
}

export const authController = new AuthController()
