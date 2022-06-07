import { PrismaClient } from "@prisma/client";
// users in JSON file for simplicity, store in a db for production applications

const prisma = new PrismaClient();

export const loginRepo = {
    find,
};

async function find(password: string) {
    console.log(password)
    const finded = await prisma.login.findUnique({
        where: {
            password: password,
        },
    });
    console.log(finded);
    if (finded) {
        return true;
    }
    return false;
}
