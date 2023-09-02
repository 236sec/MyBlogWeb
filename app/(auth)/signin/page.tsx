"use client";
import axios from "axios";
import Link from "next/link"
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";


interface User {
    username : string,
    password : string,
}

export default function SignInForm() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError ] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(!username || !password){
            setError("All Field Must Be Field.");
            return
        }
        try{
            const res = await signIn("credentials",{
                username,
                password,
                redirect:false,
            })
            if(res.error){
                setError("Invalid Credentials");
                return
            }
            router.replace("dashboard");
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="bg-white text-black mx-auto w-96 p-6">
            <h1 className="text-xl">Login To Your Account</h1>
            <h2 className="text-lg">Or <span className="text-blue-500 underline hover:no-underline hover:text-blue-800"><Link href="/signup">Sign Up</Link></span></h2>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-black border-2 text-xl"></input>
                <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-black border-2 text-xl"></input>
                <input type="submit" className="border-2 text-xl bg-cyan-400 hover:bg-cyan-700 border-black w-24"/>
            </form>
            {error && <div className="bg-red-700 text-white rounded-md p-2 text-sm">Error : {error}</div>}
        </div>
    )
    
}