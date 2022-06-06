import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  const form = await formsRepo.find(name as string);
  return res.status(200).json(form);
}
