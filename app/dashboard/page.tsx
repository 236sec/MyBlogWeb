"use client";
import { useSession, signIn, signOut } from "next-auth/react";


export default function DashBoardPage(){
    return (
    <>
        Signed in as <br />
        <button onClick={() => signOut()}>Sign out</button>
    </>
    )
}