import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthMongoRepository from "../repositories/mongoDB/auth";


export default class AuthService {
  constructor(private repository: AuthMongoRepository) { }

  register = async (firstName: string, lastName: string, email: string, password: string, avatar: string) => {
    password = await bcrypt.hash(password, 7);
    return await this.repository.create(firstName, lastName, email, password, avatar);
  }


  login = async (email: string, password: string): Promise<any> => {

    const user = await this.repository.findOne(email);

    const isMatch = await bcrypt.compare(password, user ? user!.password : "");
    if (!isMatch) { return null; } // Invalid password or email

    const token = jwt.sign(
      { userId: user!._id },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    user!.isOnline = true;
    user?.save();

    return { user, token }
  }


  logout = async (id: string) => {
    const isOnline = false;
    return await this.repository.update(id, isOnline);
  }
}
