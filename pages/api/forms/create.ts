import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nom, type } = JSON.parse(req.body);
    formsRepo.create(JSON.parse(req.body));
    return res.status(200).json({});
  }
}
