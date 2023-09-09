import { connectMongoDB } from "@/lib/mongodb";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";


interface User {
    username : string,
    password : string,
    name : string,
    email : string,
}

export async function POST(req:Request) {
    try{
        const { username , password , name , email} : User = await req.json();
        await connectMongoDB();
        await UserModel.signup({ username , password , name , email});
        return NextResponse.json({ message: "User registered."},{status : 201 });
    }catch (error : any) {
        return NextResponse.json({ message: `An error occurred. ${error.message}`},{status : 500 });
    }
}