import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Company } from "../entity/Company";
import { SignupInput, User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async signup(
    @Arg("data") { email, userName, password, confirmPassword }: SignupInput
  ) {
    try {
      const companyAccount = await Company.findOne({ email });
      const userAccount = await User.findOne({ email });
      if (companyAccount || userAccount) throw new UserInputError('Email is already in use');

      if (password !== confirmPassword) throw new UserInputError('Password must be same');

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.insert({
        email,
        userName,
        password: hashedPassword
      });

    } catch (err) {
      console.error(err);
      return err;
    }

    return true;
  }
}