import { Request, Response } from "express";
import { BandInputDTO} from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
                token: req.headers.authorization!
            }

            const bandBusiness = new BandBusiness();
            const token = await bandBusiness.createBand(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}

//     async login(req: Request, res: Response) {

//         try {

//             const loginData: LoginInputDTO = {
//                 email: req.body.email,
//                 password: req.body.password
//             };

//             const userBusiness = new UserBusiness();
//             const token = await userBusiness.getUserByEmail(loginData);

//             res.status(200).send({ token });

//         } catch (error) {
//             res.status(400).send({ error: error.message });
//         }

//         await BaseDatabase.destroyConnection();
//     }

// }
