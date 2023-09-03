import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

export default function NavBar(){
    return (
        <div className="m-0 mb-4 p-2 w-screen h-15 bg-black text-primary_light dark:text-white">
            <ol className="flex gap-5 text-2xl">
                <li className=""><Link href={"/signin"}>Login</Link></li>
                <li className=""><Link href={"/signup"}>SignUp</Link></li>
                <li><ThemeSwitch /></li>
            </ol>
        </div>
    )
}