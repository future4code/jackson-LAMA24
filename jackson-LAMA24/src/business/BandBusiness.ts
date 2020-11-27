import { getBand } from './../model/Band';
import { BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { BaseError } from "../error/BaseError";

export class BandBusiness {

    async createBand(band: BandInputDTO) {
        try {
            const authenticator = new Authenticator();
            const tokenData = authenticator.getData(band.token);
            console.log(tokenData.role)

            if (tokenData.role !== UserRole.ADMIN) {
                throw new Error("Not authourized")
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
            const bandDatabase = new BandDatabase();
            await bandDatabase.createBandData(id, band.name, band.music_genre, band.responsible)
        
        } catch (error) {
            throw new BaseError(error.message, error.statusCode);
   }
  }

//     async getBandByIdOrEmail(band: getBand) {

//         const bandDatabase = new BandDatabase();
//         await bandDatabase.getBandByIdOrName(band.id, band.name);

//         const authenticator = new Authenticator();
//         const accessToken = authenticator.getData(band.token);

//         return accessToken;
//  }
}