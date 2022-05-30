import { execGoogle } from '@/lib/api/users/sign';
import Cookies from 'js-cookie';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { mutate } from 'swr';

export default NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),  
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log(user)
  //     console.log("^^^^^^^^^")
  //     console.log(account)
  //     console.log("^^^^^^^^^")
  //     console.log(profile)
  //     console.log("^^^^^^^^^")
  //     console.log(email)
  //     console.log("^^^^^^^^^")
  //     console.log(credentials)
  //     return true
  //   },
  //   async session({ session, user, token }) {
  //     session.accessToken = token.accessToken
  //     console.log("^^^^^^^^aa^")
  //     console.log(token)
  //     console.log(session)
  //     console.log("aaa")
  //     // console.log(session,user,token)
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     // console.log(token,user,account, profile, isNewUser)
  //     // console.log(`account:${JSON.stringify(account)}`);
  //     return token;
  //   },
  // },

  // events: {
    // signIn: async (message) => { /* on successful sign in */ },
    // signOut: async (message) => { /* on signout */ },
    // // createUser: async (message) => { /* user created */ },
    // linkAccount: async (message) => { /* account linked to a user */ },
    // session: async (message) => { /* session is active */ },
    // error: async (message) => { /* error in authentication flow */ },
    // createUser: async (user) => {}
//  }
  
});