"use client";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface User {
    username : string,
    password : string,
    name : string,
    email : string,
}


export default function SignUpForm(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [error , setError ] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(!username || !password || !name || !email){
            setError("All Field Must Be Field.");
            return
        }
        try{
            const data : User = {
                username,
                password,
                name,
                email,
            };
            const res : any = axios.post('/api/register',data);
            if(res.status == 201){
                setUsername('');
                setPassword('');
                setName('');
                setEmail('');
                setError('');
                router.push('/signin');
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
        <div className={`bg-light dark:bg-black rounded-lg my-5 mx-auto w-96 p-6 shadow-lg`}>
            <h1 className="text-xl text-primary_light dark:text-primary_dark">Register Your Account</h1>
            <h2 className="text-lg text-primary_variants_light dark:text-primary_variants_dark">Already have account ? <span className="text-blue-500 underline hover:no-underline hover:text-blue-800"><Link href="/signin">Sign In</Link></span></h2>
            <form className="flex flex-col gap-2 mt-2 text-black" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-black border-2 text-xl p-1 pl-2 rounded-md"></input>
                <input type="text" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} className="border-black border-2 text-xl p-1 pl-2 rounded-md"></input>
                <input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-black border-2 text-xl p-1 pl-2 rounded-md"></input>
                <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-black border-2 text-xl p-1 pl-2 rounded-md mb-2"></input>
                <input type="submit" className="p-1 border-2 rounded-xl text-xl text-white bg-primary_variants_light dark:bg-sky dark:hover:bg-[#0369a1] hover:cursor-pointer hover:bg-primary_light border-black w-24"/>
            </form>
            {<div className="bg-red text-white rounded-md p-2 text-sm">Error : {error ? error : "Hello"}</div>}
        </div>
    )
}