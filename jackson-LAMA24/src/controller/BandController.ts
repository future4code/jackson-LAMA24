import { Band } from './../model/Band';
import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { getBandByIdOrName } from "../business/BandBusiness"

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
            await bandBusiness.createBand(input);

            res.status(200).send("band created");

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        
    }

    // async getPostById(req: Request, res: Response) {
    //     try {
    //         const output: Band = await BandBusiness.getBandByIdOrName ({
    //             id: req.params.id,
    //             token: req.headers.authorization as string
    //         })

    //         if (!output) {
    //             throw new Error("Post not found");
    //         }

    //         res.status(200).send({ message: "Success!", post: output })
    //     } catch (error) {
    //         res.status(400).send({ message: error.message });
    //     }
    // }
}
