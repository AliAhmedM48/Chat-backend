import User from "../../models/user";

export default class AuthMongoRepository {
  create = async (firstName: string, lastName: string, email: string, password: string, avatar: string) => {
    return await User.create({ firstName, lastName, email, password, avatar });
  }
  findOne = async (email: string) => await User.findOne({ email });
  update = async (id: string, isOnline: boolean) => await User.findByIdAndUpdate(id, { isOnline });
}
