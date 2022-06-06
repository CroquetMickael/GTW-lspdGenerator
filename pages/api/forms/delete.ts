import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    formsRepo.deleteForm(id as string);
    return res.status(200).json({});
  }
}
