import User from "../../models/user";

export default class UserMongoRepository {
  findAll = async (loggedUser: string) =>
    await User.find({ _id: { $ne: loggedUser } });

  findOne = async (id: string) => await User.findById(id);

  update = async (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string,
    isOnline: boolean
  ) => {
    return await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, avatar, password, isOnline },
      { new: true }
    );
  };

  delete = async (id: string) => await User.findByIdAndDelete(id);
}
