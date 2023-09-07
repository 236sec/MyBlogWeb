"use client";
import { useSession, signOut } from "next-auth/react";

export default function DashBoardPage(){
    const {data : session} = useSession();
    
    return (
    <div>
        <h1>Signed in as {session?.user?.email}</h1>
        <h1>Signed in as {session?.user?.name}</h1>
        <button onClick={() => {console.log(session)}}>Log Session</button>
        <button onClick={() => signOut()}>Sign out</button>
    </div>
    )
}