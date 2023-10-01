import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

interface UserCredentials { 
    username : string, 
    password : string,
}

export const authOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
        CredentialsProvider({
            name:"credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username ,  password } : UserCredentials = credentials as UserCredentials;
                
                try{
                    await connectMongoDB();
                    const user = await User.login({username,password});
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
    callbacks: {
        async signIn({ account, profile } : { account: any, profile: any}) {
          try{
            if(profile.email_verified && profile.email.endsWith("@gmail.com")){
              await connectMongoDB();
              if (account.provider === "google") {
                
                if(profile.email){
                  const user = await User.login({email:profile.email,password:""});
                  if(user){
                    return true;
                  }else{
                    throw Error("Not Found Your Account");
                    return false;
                  }
                }
              }
            }else{
              throw Error("Your Email is not verified or not gmail.com");
              return false;
            }
            return profile.email_verified && profile.email.endsWith("@gmail.com")
          } catch (error : any) {
            console.log(error.message);
            return false;
          }
          },
        async jwt({ token, user ,account ,trigger , session} : { token: any, user: any, account: any, trigger: any, session: any}) {
          //update user name
            if(trigger === "update" && session?.name){
              token.name = session.name;
              //will update the user name in the database
              
            }
            // Persist the OAuth access_token to the token right after signin
            if (user) {
              return {
                ...token,
                id: user.id,
                accessToken: account?.accessToken,
              }
            }
            return token;
          },
          async session({ session, token, user } : { session: any, token: any, user: any}) {
            // Send properties to the client, like an access_token from a provider.
            console.log("Session CALLBACK ",token);
            return {
              ...session,
              user: {
                ...session.user, //Update the user object
                id: token.id,
                name: token.name,
              }
            }
          },
      },
    //pages: {
    //    signIn: "/login",
    //},
    debug: process.env.NODE_ENV === "development",
};