import { Model, Schema, model , models} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    username: string;
    password: string;
    name: string;
    email: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserModel extends Model<IUser> {
  login({ email, username, password }: { email?: string; username?: string; password: string }): Promise<IUser | null>;
  signup({ username, password, name, email }: IUser): Promise<IUser | null>;
}

const schema = new Schema<IUser, UserModel>({
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Use true for uniqueness constraint
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Use true for uniqueness constraint
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  


schema.static('login', async function login({ email, username, password }: { email?: string; username?: string; password: string }): Promise<IUser | null> {
  console.log(`Checking ${{ email, username, password }}`);
  if (email != null || email != undefined) {
    const userDoc = await this.findOne({ email });
    if (userDoc) {
      return userDoc;
    } else {
      throw new Error("Email not found in user.ts");
    }
  } else {
    const userDoc = await this.findOne({ username });
    if (userDoc) {
      if (bcrypt.compareSync(password, userDoc.password)) {
        return userDoc;
      } else {
        throw new Error("Incorrect Password");
      }
    } else {
      throw new Error("Account not found");
    }
  }
});

schema.static("signup", async function({ username , password , name , email } : IUser){
    console.log("Checking",username,password,name,email);
    if(!username || !password || !name || !email ){throw new Error("All Fields must be filled")}
    const exits = await this.findOne({username});
    if (exits){ throw new Error("This username has already used") };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new this({username,password:hashPassword,name,email});
    await newUser.save();
    console.log("Register",username,hashPassword);
    return newUser;
})

const User = (models.Users as any) ||model<IUser, UserModel>('User', schema);

export default User;