import mongoose from "mongoose";

let isConnected : boolean = false;

export const connectMongoDB = async () => {
    mongoose.set("strictQuery",true);
    if(isConnected){
        return;
    }
    try {
        const mongodb_uri : string = process.env.MONGODB_URI as string;
        await mongoose.connect(mongodb_uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connect to MongoDB");
    } catch (error) {
        console.log("Error Connect MongoDB",error);
        throw new Error("Cant Connect to MongoDB");
    }
}