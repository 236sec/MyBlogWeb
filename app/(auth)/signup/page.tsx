import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "../../../components/SignUpForm";

interface User {
    username : string,
    password : string,
}

export default async function SignUpPage() {
    const session = await getServerSession();

    if(session){
        redirect("/dashboard");
    }

    return (
        <div>
            <SignUpForm />
        </div>
    )
}