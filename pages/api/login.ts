import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../helpers/session";
import { NextApiRequest, NextApiResponse } from "next";
import { loginRepo } from "../../helpers/login-repo";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { password } = await JSON.parse(req.body);
        try {
            const isLogged = await loginRepo.find(password);
            console.log(isLogged);
            if (isLogged) {
                req.session.isLogged = true;
                await req.session.save();
                res.status(200).json({});
            }
            res.status(401).json({});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: (error as Error).message });
        }
    }
}