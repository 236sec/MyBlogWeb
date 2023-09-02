import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const mongodb_uri : string = process.env.MONGODB_URI as string;
        await mongoose.connect(mongodb_uri);
        console.log("Connect to MongoDB");
    } catch (error) {
        console.log("Error Connect MongoDB",error);
        throw new Error("Cant Connect to MongoDB");
    }
}