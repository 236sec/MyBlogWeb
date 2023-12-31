import bcrypt from "bcrypt";
import mongoose,{ Document, model, models } from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        require: [true , "UserName is required" ],
        unique: [true , "This username has already used"],
    },
    password: { 
        type: String,
        require: [true , "Password is required"],
    },
    email: { 
        type: String, 
        require: [true , "Email is required"],
        unique: [true , "This email has already used"],
    },
    name: { 
        type: String,
        require: [true , "Name is required"],
    },
    image: { 
        type: String, 
        require: false,
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

export interface DUser extends Document {
    username: string,
    password: string,
    email: string,
    name: string,
}

export interface IUser {
    username: string;
    password: string;
    name: string;
    email: string;
}


UserSchema.statics.signup = async function({ username , password , name , email } : IUser){
    console.log("Checking",username,password,name,email);
    if(!username || !password || !name || !email ){throw new Error("All Fields must be filled")}
    const exits = await this.findOne({username});
    if (exits){ throw new Error("This username has already used") };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new this({username,password:hashPassword,name,email});
    await newUser.save();
    console.log("Register",username,hashPassword);
}

UserSchema.statics.login = async function({email , username , password} : {email?:string,username?:string,password:string}){
    console.log(`Checking ${{email,username,password}}`);
    if(email != null || email != undefined){
        const userDoc = await this.findOne({email});
        if (userDoc){
            return userDoc;
        }else{
            throw new Error("Do not found your Email In user.ts");
        }
    }else{
        const userDoc = await this.findOne({username});
        if (userDoc){
            if(bcrypt.compareSync(password, userDoc.password)){
                return userDoc;
            }else{
                throw new Error("Incorrect Password");
            }
        }else{
            throw new Error("Not Found Your Account");
        }
    }
}


const User = (models.Users as any )|| model<DUser>('Users', UserSchema);

export default User;