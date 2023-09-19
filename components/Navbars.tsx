"use client";
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import { useTheme } from "@mui/material";
import Image from "next/image";
import Home from "../public/assets/home.svg";
import HomeFill from "../public/assets/homefill.svg";
import { useSession , getProviders } from "next-auth/react";
import { useEffect , useState } from "react";


export default function NavBar(){    
    const theme = useTheme();
    const { data: session , status } = useSession();
    const [providers , setProviders] = useState(null);


    useEffect(() => {
        const fetchProvidersData = async () => {
            const res = await getProviders() as any;
            setProviders(res);
        }
        fetchProvidersData();
    }, [setProviders]);

    console.log(providers);
    console.log(session?.user?.image);
    return (
        <div className="m-0 mb-4 p-2 w-screen h-15 flex flex-row shadow-md bg-white dark:bg-black text-primary_light dark:text-white">
            { theme.palette.mode === 'dark' ? <Link href={"/"}><Image alt="HomeIcon" src={HomeFill} width={30} height={30} className="stroke-white" /></Link> : <Link href={"/"}><Image alt="HomeIcon" src={Home} width={30} height={30} className="stroke-white" /></Link>}

            <ol className="flex gap-5 text-2xl">
                <li className=""><Link href={"/api/auth/signin"}>Login</Link></li>
                <li className=""><Link href={"/signup"}>SignUp</Link></li>
                <li className=""><Link href={"/dashboard"}>Dashboard</Link></li>
            </ol>
            <ThemeSwitch theme={theme} />
            <span>
                <Image alt="Profile" src={`${session?.user?.image}`} width={30} height={30} className="rounded-full" />
            </span>
        </div>
    )
}
