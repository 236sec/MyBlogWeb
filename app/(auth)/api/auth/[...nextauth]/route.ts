import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserCredentials { 
    username : string, 
    password : string,
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username , password } : UserCredentials = credentials as UserCredentials;
                
                try{
                    await connectMongoDB();
                    //const user = await User.login(username,password);
                    //const user = { username:String(username) ,id:"123129i932593989423" ,email:"sompon.o@ku.th" };
                    const user = {name:"jsmith", email:"Bestnaja"};
                    console.log(user);
                    return user;
                } catch (error) {
                    console.log(error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        jwt: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
    //pages: {
    //    signIn: "/login",
    //},
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST};