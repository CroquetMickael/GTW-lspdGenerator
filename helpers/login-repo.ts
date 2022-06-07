import { PrismaClient } from "@prisma/client";
// users in JSON file for simplicity, store in a db for production applications

const prisma = new PrismaClient();

export const loginRepo = {
    find,
};

async function find(password: string) {
    const finded = await prisma.login.findUnique({
        where: {
            password: password,
        },
    });
    if (finded) {
        return true;
    }
    return false;
}
