import bcrypt from "bcryptjs";
import UserMongoRepository from "../repositories/mongoDB/users";


export default class UserService {

    constructor(private repository: UserMongoRepository) { }

    getAllUsers = async () => await this.repository.findAll();

    getOneUser = async (id: string) => await this.repository.findOne(id);

    updateUser = async (id: string, firstName: string, lastName: string, email: string, password: string, avatar: string, isOnline: boolean) => {
        if (password) { password = await bcrypt.hash(password, 7); }
        return await this.repository.update(id, firstName, lastName, email, password, avatar, isOnline)
    }

    deleteUser = async (id: string) => await this.repository.delete(id);

}
