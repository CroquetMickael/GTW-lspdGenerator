import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nom, type } = JSON.parse(req.body);
    try {
      formsRepo.create(JSON.parse(req.body));
      return res.status(200).json({});
    }
    catch (err) {
      return res.status(400).json(err);
    }
  }
}
