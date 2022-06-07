import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const forms = await formsRepo.getAll();
      return res.status(200).json(forms);
    }
    catch (err) {
      return res.status(400).json(err);
    }
  }
}
