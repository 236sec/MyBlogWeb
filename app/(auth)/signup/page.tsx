"use client";
import axios from "axios";
import Link from "next/link"
import { useState } from "react";

interface User {
    username : string,
    password : string,
}

export default function SignUpForm() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError ] = useState("");

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(!username || !password){
            setError("All Field Must Be Field.");
            return
        }
        try{
            const data : User = {
                username,
                password
            };
            const res = await axios({
                method: 'post',
                url: '/api/register',
                data : JSON.stringify(data),
                headers: {
                    "Content-Type":'application/json',
                }
              });
            if(res.status == 201){
                setUsername('');
                setPassword('');
                setError('');
            }else{
                alert("User Register Failed")
            }

            
        }catch(error){
            if (axios.isAxiosError(error)) {
                const axiosError = error as any;
                const err = axiosError.response.data.message ? axiosError.response.data.message : "Internal Server Error";
                setError(err);
                console.log(axiosError.response.status);
              }else {
                // Handle the case where error.response is undefined
                console.error('No response from the server');
              }
        }
    }

    return (
        <div className="bg-white text-black mx-auto w-96 p-6">
            <h1 className="text-xl">Register Your Account</h1>
            <h2 className="text-lg">Already have account ? <span className="text-blue-500 underline hover:no-underline hover:text-blue-800"><Link href="/signin">Sign In</Link></span></h2>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-black border-2 text-xl"></input>
                <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-black border-2 text-xl"></input>
                <input type="submit" className="border-2 text-xl bg-cyan-400 hover:bg-cyan-700 border-black w-24"/>
            </form>
            {error && <div className="bg-red-700 text-white rounded-md p-2 text-sm">Error : {error}</div>}
        </div>
    )
}