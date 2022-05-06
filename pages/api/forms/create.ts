import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";
import { linksRepo } from "../../../helpers/link-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nom, isBBCode } = JSON.parse(req.body);
    formsRepo.create(JSON.parse(req.body));
    linksRepo.create({
      label: `Formulaire ${nom}`,
      link: `/form/${String(nom).toLocaleLowerCase()}`,
      isBBCode,
    });
    return res.status(200).json({});
  }
}
