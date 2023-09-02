import { connectMongoDB } from "@/lib/mongodb";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

interface User {
    username : string,
    password : string,
}

export async function POST(req:Request) {
    const secret = process.env.secret;
    try{
        const { username , password } : User = await req.json();
        await connectMongoDB();
        await UserModel.signup({ username , password });
        return NextResponse.json({ message: "User registered."},{status : 201 });
    }catch (error) {
        return NextResponse.json({ message: `An error occurred. ${error.message}`},{status : 500 });
    }
}