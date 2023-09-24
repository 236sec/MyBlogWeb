"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function DashBoardPage(){
    const {data : session , status , update} = useSession();
    const [newName , setNewName] = useState("");
    
    return (
    <div>
        <h1>Signed in as {session?.user?.email}</h1>
        <h1>Signed in as {session?.user?.name}</h1>
        <div className="flex flex-col items-start gap-3">
            <input type="text" className="w-64" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button className="bg-primary_light rounded-md p-3" onClick={() => update({name : newName})}>Update Name</button>
            <button className="bg-primary_light rounded-md p-3" onClick={() => {console.log(session)}}>Log Session</button>
            <button className="bg-primary_light rounded-md p-3 dark:text-white" onClick={() => signOut({callbackUrl:"/"})}>Sign out</button>
        </div>
    </div>
    )
}