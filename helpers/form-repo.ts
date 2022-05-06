const fs = require("fs");

// users in JSON file for simplicity, store in a db for production applications
let forms: any[] = require("../data/form.json");

export const formsRepo = {
  getAll: () => forms,
  find: (name: string) =>
    forms.find((form: any) => {
      return new RegExp(name, "i").test(form?.nom);
    }),
  create,
  deleteForm,
  update,
};

function create(form: any) {
  forms.push(form);
  saveData();
}

function saveData() {
  fs.writeFileSync("data/form.json", JSON.stringify(forms, null, 4));
}

function deleteForm(nom: string) {
  const formsUpdated = forms.filter((form: any) => {
    const nomForm = new RegExp(nom, "i");
    return !nomForm.test(form?.nom);
  });

  forms = formsUpdated;
  saveData();
}

function update(nom: string, formToUpdate: any) {
  delete formToUpdate?.oldName;
  const index = forms.findIndex((form: any) =>
    new RegExp(nom, "i").test(form?.nom)
  );
  forms.splice(index, 1, formToUpdate);
  saveData();
}
