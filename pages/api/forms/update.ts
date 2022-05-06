import { NextApiRequest, NextApiResponse } from "next";
import { formsRepo } from "../../../helpers/form-repo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { oldName } = JSON.parse(req.body);
    formsRepo.update(oldName, JSON.parse(req.body));
    return res.status(200).json({});
  }
}
