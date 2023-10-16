import { Request, Response } from "express";
import { userService } from "../services/userServices";
import { z } from "zod";
class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
      const ZUserSchema = z.object({
        //prettier-ignore
        name: z.string().min(2, {message: "O nome precisa ter 2 ou mais caracteres."}).optional(),
        //prettier-ignore
        email: z.string().email({message: "Por favor, Insira um e-mail válido."}),
        //prettier-ignore
        password: z.string().min(8, {message: "A senha precisa ter no mínimo 8 caracteres."}),
      });
      ZUserSchema.parse({ name, email, password });
      /* res.status(200).json("Dados recebidos e validados com sucesso!"); */
    } catch (e: any) {
      return res.status(400).json({
        message: "Dados inválidos",
        error: e.errors,
      });
    }
    try {
      return res.status(200).json({
        message: "Criado com sucesso.",
        data: await userService.create(name, email, password),
      });
    } catch (e: any) {
      return res.status(409).json({
        message: e.message,
      });
    }
  }

  public async read(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      //prettier-ignore
      const ZUserSchema = z.string().uuid({message: "Por favor insira UUID válido."});
      ZUserSchema.parse(userId);
    } catch (e: any) {
      return res.status(400).json({
        message: e.errors,
      });
    }
    try {
      return res.status(200).json({
        data: await userService.read(userId),
      });
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }

  public async update(req: Request, res: Response) {
    const userId = req.params.id;
    const { name } = req.body;
    try {
      //prettier-ignore
      const ZUserSchema = z.object({
        userId: z.string().uuid({message: "Por favor insira UUID válido."}) ,
        name: z.string().min(2, { message: "O nome precisa ter mais de 2 caracteres" })
      });
      ZUserSchema.parse({ userId, name });
    } catch (e: any) {
      return res.status(400).json({
        message: e.errors,
      });
    }

    try {
      return res.status(200).json({
        message: "Nome de usuário alterado!",
        data: await userService.update(userId, name),
      });
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      //prettier-ignore
      const ZUserSchema = z.string().uuid({ message: "Por favor insira UUID válido." });
      ZUserSchema.parse(userId);
    } catch (e: any) {
      return res.status(400).json({
        message: e.errors,
      });
    }

    try {
      return res.status(200).json({
        message: "Usuário excluido",
        data: await userService.delete(userId),
      });
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }
}
export const userController = new UserController();
