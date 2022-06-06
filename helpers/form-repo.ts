import { PrismaClient } from "@prisma/client";
// users in JSON file for simplicity, store in a db for production applications

const prisma = new PrismaClient();

export const formsRepo = {
  getAll,
  find,
  create,
  deleteForm,
  update,
};

async function getAll() {
  const forms = await prisma.forms.findMany();
  return forms;
}
async function create(form: any) {
  await prisma.forms.create({
    data: {
      ...form,
      form: JSON.stringify(form.form),
      textToEdit: JSON.stringify(form.textToEdit),
    },
  });
}

async function find(name: string) {
  const form = await prisma.forms.findUnique({
    where: {
      id: name,
    },
  });
  return form;
}

async function deleteForm(nom: string) {
  await prisma.forms.delete({
    where: {
      id: nom,
    },
  });
}

async function update(nom: string, formToUpdate: any) {
  delete formToUpdate.oldName;
  await prisma.forms.update({
    where: {
      id: nom,
    },
    data: {
      ...formToUpdate,
      form: JSON.stringify(formToUpdate.form),
      textToEdit: formToUpdate.textToEdit,
    },
  });
}
