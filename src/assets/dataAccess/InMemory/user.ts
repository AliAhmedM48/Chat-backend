import IUserRepository from "../IRepositories/IUser";

class UserRepository implements IUserRepository {
    getAllUsers(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getOneUser(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateUser(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteUser(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export = UserRepository;