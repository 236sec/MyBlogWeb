import { NextResponse } from "next/server";


interface IPost { 
    user: { 
        name: string, 
        image: string 
    }, 
    title: string, 
    tag: [string], 
    content: string,
}

export async function GET(request:Request) {
    try{
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        return NextResponse.json(id,{status : 200 });
    }catch (error : any) {
        return NextResponse.json({ message: `An error occurred. ${error.message}`},{status : 500 });
    }
}