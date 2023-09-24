import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import PostsModel from "@/models/post";


interface IPost { 
    user: { 
        name: string, 
        image: string 
    }, 
    title: string, 
    tag: [string], 
    content: string,
}


export async function POST(req:Request) {
    try{
        const { user , title , tag , content} : IPost = await req.json();
        console.log(user , title , tag , content)
        await connectMongoDB();
        await PostsModel.create({ user, title ,tag ,content} as IPost);
        return NextResponse.json({ message: "Post Created."},{status : 201 });
    }catch (error : any) {
        return NextResponse.json({ message: `An error occurred. ${error.message}`},{status : 500 });
    }
}

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    console.log("Try to Search",id);
    try{
        if(id){
            await connectMongoDB();
            const posts = await PostsModel.findById(id);
            if(!posts){
                return NextResponse.json({ message: "Post not found."},{status : 404 });
            }
            return NextResponse.json(posts,{status : 200 });
        }
        else{
            await connectMongoDB();
            const posts = await PostsModel.find({});
            return NextResponse.json(posts,{status : 200 });
        }
    } catch (error : any) {
        return NextResponse.json({ message: `An error occurred. ${error.message}`},{status : 500 });
    }
}