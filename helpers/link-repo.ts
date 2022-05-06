const fs = require("fs");

// users in JSON file for simplicity, store in a db for production applications
let links = require("../data/link.json");

export const linksRepo = {
  getAll: () => links,
  create,
  deleteLien
};

function create(link: any) {
  links.push(link);
  saveData();
}

function saveData() {
  fs.writeFileSync("data/link.json", JSON.stringify(links, null, 4));
}

function deleteLien(nom: string) {
  const linksUpdated = links.filter((link: any) => {
    const nomLabelLien = new RegExp(nom, "i");
    return !nomLabelLien.test(link.label);
  })

  links = linksUpdated;
  saveData();
}
