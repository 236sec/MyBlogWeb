import { connectMongoDB } from "@/lib/mongodb";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(req:Request) {
    try{
        const { username , password } : { username : string , password : string} = await req.json();
        await connectMongoDB();
        await UserModel.signin({ username , password });
        return NextResponse.json({ message: "User Login Success."},{status : 201 });
    }catch (error) {
        return NextResponse.json({ message: "An error occurred."},{status : 500 });
    }
}