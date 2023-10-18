import { prisma } from "prismaConn";
import bcrypt from "bcrypt";
class AuthServices {
  public async login(email: string, password: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      throw new Error("DB EMAIL 404");
    }
    const passMatch = await bcrypt.compare(password, findUser.password);
    if (!passMatch) {
      throw new Error("DB PASSWORD 401");
    }
    return findUser;
  }
}

export const authServices = new AuthServices();
