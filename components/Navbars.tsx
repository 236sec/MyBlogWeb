"use client";
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useTheme } from "@mui/material";
import Image from "next/image";
import Home from "../public/assets/home.svg";
import HomeFill from "../public/assets/homefill.svg";

export default function NavBar(){    
    const theme = useTheme();
    
    return (
        <div className="m-0 mb-4 p-2 w-screen h-15 flex flex-row shadow-md bg-white dark:bg-black text-primary_light dark:text-white">
            { theme.palette.mode === 'dark' ? <Image alt="HomeIcon" src={HomeFill} width={30} height={30} className="stroke-white" /> : <Image alt="HomeIcon" src={Home} width={30} height={30} className="stroke-white" />}
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