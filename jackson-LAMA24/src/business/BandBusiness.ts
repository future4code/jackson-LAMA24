import { BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";

export class BandBusiness {

    async createBand(band: BandInputDTO) {

        const authenticator = new Authenticator();
        const tokenData = authenticator.getData(band.token);
        
        if(tokenData.role !== "ADMIN") {
            throw new BaseError("Not authourized", 401)
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        const bandDatabase = new BandDatabase();
        await bandDatabase.createBandData(id, band.name, band.music_genre, band.responsible)
    }
}

//     async getUserByEmail(user: LoginInputDTO) {

//         const userDatabase = new UserDatabase();
//         const userFromDB = await userDatabase.getUserByEmail(user.email);

//         const hashManager = new HashManager();
//         const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

//         const authenticator = new Authenticator();
//         const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

//         if (!hashCompare) {
//             throw new Error("Invalid Password!");
//         }

//         return accessToken;
//  