import { Request, Response } from "express";
import { authServices } from "../services/auth-services";
import z from "zod";
class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const ZUserSchema = z.object({
        email: z.string().email({ message: "404 Email" }),
        password: z.string().min(8, { message: "404 Password" }),
      });
      ZUserSchema.parse({ email, password });
    } catch (e: any) {
      return res.status(400).json({
        error: e.errors,
      });
    }

    try {
      return res.status(200).json({
        message: "Login Sucess",
        data: await authServices.login(email, password),
      });
    } catch (e: any) {
      return res.status(401).json({
        error: e.message,
      });
    }
  }
  public async token(req: Request, res: Response) {}
}
export const authController = new AuthController();
