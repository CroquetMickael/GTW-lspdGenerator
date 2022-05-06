import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";
import { linksRepo } from "../../../helpers/link-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { name } = JSON.parse(req.body);
    formsRepo.deleteForm(name as string);
    linksRepo.deleteLien(name as string);
    return res.status(200).json({});
  }
}
