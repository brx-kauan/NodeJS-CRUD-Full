import { prisma } from "prismaConn";
import bcrypt from "bcrypt";
//enum
import { EStatusErrors } from "enum/status-errors.enum";
class AuthServices {
  public async login(email: string, password: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }
    const passMatch = await bcrypt.compare(password, findUser.password);
    if (!passMatch) {
      throw new Error(EStatusErrors.E401);
    }
    return findUser;
  }
}

export const authServices = new AuthServices();
