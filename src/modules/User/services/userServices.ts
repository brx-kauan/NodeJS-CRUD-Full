import { prisma } from "prismaConn";
import bcrypt from "bcrypt";
import { UtilsFileUser } from "./utils/utils-file";
import { error } from "console";

class UserService {
  public async create(name: string, email: string, password: string) {
    const findUserbyEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findUserbyEmail) {
      throw new Error("Dados já existentes na base de dados.");
    }
    const create = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 6),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    UtilsFileUser.createUserFolder(create.id);
    return create;
  }

  public async read(userId: string) {
    const findUserbyID = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!findUserbyID) {
      throw new Error("Nenhum usuário encontrado com este ID.");
    }
    return findUserbyID;
  }

  public async update(userId: string, newName: string) {
    const findUserbyID = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUserbyID) {
      throw new Error("Usuário não encontrado");
    }
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newName,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return updateUser;
  }

  public async delete(userId: string) {
    const findUserbyID = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUserbyID) {
      throw new Error("Usuário não encontrado");
    }
    try {
      UtilsFileUser.deleteUserFolder(userId);
      const deleteUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return deleteUser;
    } catch (error) {
      return error;
    }
  }
}
export const userService = new UserService();