"use client";
import {useTheme} from "next-themes";
import {useState,useEffect} from "react";

export default function DashBoardPage(){
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
    <div className="">
        <h1>Hello This is Theme : {theme} </h1>
        <h1 className="dark:text-white text-primary_light">Hello</h1>
    </div>
    )
}