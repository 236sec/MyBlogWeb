import bcrypt from "bcrypt";
import mongoose,{ Document, model, models } from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String , require:true },
    password: { type: String , require:true },
    email: { type: String , require:true },
    name: { type: String , require:true },
    image: { type: String , require:false },
    createdAt: { type: Date , default: Date.now },
    updatedAt: { type: Date , default: Date.now },
});

export interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    name: string,
}

UserSchema.statics.signup = async function({ username , password , name , email } : IUser){
    console.log("Checking",username,password,name,email);
    if(!username || !password || !name || !email ){throw Error("All Fields must be filled")}
    const exits = await this.findOne({username});
    if (exits){ throw Error("This username has already used") };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new this({username,password:hashPassword,name,email});
    await newUser.save();
    console.log("Register",username,hashPassword);
}

UserSchema.statics.login = async function(username,password){
    const userDoc = await this.findOne({username});
    if (userDoc){
        if(bcrypt.compareSync(password, userDoc.password)){
            return userDoc;
        }else{
            throw Error("Incorrect Password");
        }
    }else{
        throw Error("Not Found Your UserName");
    }
}


const User = models.Users || model<IUser>('Users', UserSchema);
export default User;