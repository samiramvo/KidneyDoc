import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "@/lib/utilsconnection";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ emailuser: credentials.emailuser });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.passworduser,
      user.passworduser
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.emailuser = user.emailuser;
        token.username = user.username;
        token.img = user.img;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.isAdmin = token.isAdmin;
        session.user.emailuser = token.emailuser;
      }
      return session;
    },
  },
});

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { authConfig } from "./authconfig";
// import { connectToDB } from "@/lib/utilsconnection";
// import { User } from "@/lib/models";
// import bcrypt from "bcryptjs";

// const login = async (credentials) => {
//   try {
//     connectToDB();
//     const user = await User.findOne({ emailuser: credentials.emailuser });

//     if (!user) throw new Error("Wrong credentials!");

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.passworduser,
//       user.passworduser
//     );

//     if (!isPasswordCorrect) throw new Error("Wrong credentials!");
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to login!");
//   }
// };

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);

//           // Simulate OTP verification step
//           const otpVerified = await verifyOTP(user, credentials.otp);
//           if (!otpVerified) {
//             throw new Error("Invalid OTP");
//           }

//           return user;
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.emailuser = user.emailuser;
//         token.username = user.username;
//         token.img = user.img;
//         token.isAdmin = user.isAdmin;
//         token.otpVerified = true; // Indicate that OTP is verified
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.username = token.username;
//         session.user.img = token.img;
//         session.user.isAdmin = token.isAdmin;
//         session.user.emailuser = token.emailuser;
//         session.user.otpVerified = token.otpVerified;
//       }
//       return session;
//     },
//   },
// });

// // Simulated OTP verification function
// async function verifyOTP(user, otp) {
//   // Implement your OTP verification logic here
//   return true; // Return true if OTP is verified, otherwise false
// }
