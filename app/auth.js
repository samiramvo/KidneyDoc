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
// import { connectToDB } from "@/lib/utilsconnection";
// import { User } from "@/lib/models";
// import bcrypt from "bcryptjs";

// const loginAttempts = {}; // In-memory store for tracking login attempts
// const maxAttempts = 3;
// const blockTimePeriod = 5 * 60 * 1000; // 5 minutes

// const trackLoginAttempt = (emailuser) => {
//   const now = Date.now();

//   if (loginAttempts[emailuser]) {
//     loginAttempts[emailuser].count += 1;
//   } else {
//     loginAttempts[emailuser] = { count: 1, firstAttemptTime: now };
//   }
//   console.log(`Login attempt for ${emailuser}:`, loginAttempts[emailuser]);
// };

// const shouldBlockUser = (emailuser) => {
//   if (loginAttempts[emailuser]) {
//     const { count, firstAttemptTime } = loginAttempts[emailuser];
//     if (count >= maxAttempts) {
//       if (Date.now() - firstAttemptTime < blockTimePeriod) {
//         console.log(`User ${emailuser} is blocked.`);
//         return true; // User is blocked
//       } else {
//         // Reset attempt count after block time has passed
//         console.log(`Resetting attempts for ${emailuser}.`);
//         delete loginAttempts[emailuser];
//       }
//     }
//   }
//   return false; // User is not blocked
// };

// const login = async (credentials) => {
//   try {
//     connectToDB();

//     // Check if the user should be blocked before querying the database
//     if (shouldBlockUser(credentials.emailuser)) {
//       throw new Error("User is blocked. Please try after 5 minutes.");
//     }

//     const user = await User.findOne({ emailuser: credentials.emailuser });

//     if (!user) {
//       trackLoginAttempt(credentials.emailuser);
//       throw new Error("Wrong credentials!");
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.passworduser,
//       user.passworduser
//     );

//     if (!isPasswordCorrect) {
//       trackLoginAttempt(credentials.emailuser);
//       const attemptsLeft =
//         maxAttempts - loginAttempts[credentials.emailuser].count;
//       throw new Error(
//         `Wrong credentials! You have ${attemptsLeft} attempts left.`
//       );
//     }

//     // Reset attempts on successful login
//     delete loginAttempts[credentials.emailuser];
//     console.log(`User ${credentials.emailuser} logged in successfully.`);
//     return user;
//   } catch (err) {
//     console.log(err.message);
//     throw new Error(err.message);
//   }
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return user;
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.emailuser = user.emailuser;
//         token.username = user.username;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.username = token.username;
//         session.user.emailuser = token.emailuser;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
