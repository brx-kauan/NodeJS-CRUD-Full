import { Request, Response } from "express"
import { userService } from "../services/userServices"
import { z } from "zod"

//Enum
import { ECrud } from "enum/crud.enum"
import { EStatusErrors } from "enum/status-errors.enum"
import { error } from "console"

class UserController {
	public async create(req: Request, res: Response) {
		const { name, email, password } = req.body
		try {
			const ZUserSchema = z.object({
				//prettier-ignore
				name: z.string().min(2, {message: "Invalid Name."}).optional(),
				//prettier-ignore
				email: z.string().email({message: "Invalid E-mail."}),
				//prettier-ignore
				password: z.string().min(8, {message: "Invalid Password"}),
			})
			ZUserSchema.parse({ name, email, password })
			/* res.status(200).json("Dados recebidos e validados com sucesso!"); */
		} catch (e: any) {
			return res.status(400).json({
				message: EStatusErrors.E400,
				error: e.errors,
			})
		}
		try {
			return res.status(200).json({
				message: ECrud.CREATE,
				data: await userService.create(name, email, password),
			})
		} catch (e: any) {
			return res.status(409).json({
				message: e.message,
			})
		}
	}

	public async read(req: Request, res: Response) {
		const userId = req.params.id
		try {
			//prettier-ignore
			const ZUserSchema = z.string().uuid({message: "Invalid UUID."});
			ZUserSchema.parse(userId)
		} catch (e: any) {
			return res.status(400).json({
				message: EStatusErrors.E400,
				error: e.errors,
			})
		}
		try {
			return res.status(200).json({
				message: ECrud.READ,
				data: await userService.read(userId),
			})
		} catch (e: any) {
			return res.status(404).json({
				message: e.message,
			})
		}
	}

	public async update(req: Request, res: Response) {
		const userId = req.params.id
		const { name } = req.body
		try {
			//prettier-ignore
			const ZUserSchema = z.object({
        userId: z.string().uuid({message: "Invalid UUID."}) ,
        name: z.string().min(2, { message: "Invalid Name." })
      });
			ZUserSchema.parse({ userId, name })
		} catch (e: any) {
			return res.status(400).json({
				message: EStatusErrors.E400,
				error: e.errors,
			})
		}

		try {
			return res.status(200).json({
				message: ECrud.UPDATE,
				data: await userService.update(userId, name),
			})
		} catch (e: any) {
			return res.status(404).json({
				message: e.message,
			})
		}
	}

	public async delete(req: Request, res: Response) {
		const userId = req.params.id
		try {
			//prettier-ignore
			const ZUserSchema = z.string().uuid({ message: "Invalid UUID" });
			ZUserSchema.parse(userId)
		} catch (e: any) {
			return res.status(400).json({
				message: EStatusErrors.E400,
				error: e.errors,
			})
		}

		try {
			return res.status(200).json({
				message: ECrud.DELETE,
				data: await userService.delete(userId),
			})
		} catch (e: any) {
			return res.status(404).json({
				message: e.message,
			})
		}
	}
}
export const userController = new UserController()
