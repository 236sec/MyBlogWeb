"use client";
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useTheme } from "@mui/material";

export default function NavBar(){    
    const theme = useTheme();
    
    return (
        <div className="m-0 mb-4 p-2 w-screen h-15 flex flex-row bg-black text-primary_light dark:text-white">
            { theme.palette.mode === 'dark' ? <HomeIcon /> : <HomeOutlinedIcon />}
            <span className=""><Link href={"/"}>Home</Link></span>

            <ol className="flex gap-5 text-2xl">
                <li className=""><Link href={"/api/auth/signin"}>Login</Link></li>
                <li className=""><Link href={"/signup"}>SignUp</Link></li>
                <li className=""><Link href={"/dashboard"}>Dashboard</Link></li>
            </ol>
            <ThemeSwitch />
        </div>
    )
}