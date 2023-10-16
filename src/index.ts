import { main } from "./main";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

main.server.listen(3000);
