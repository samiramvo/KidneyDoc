export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};

// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       const isLoggedIn = auth?.user;
//       const isOtpVerified = auth?.user?.otpVerified;
//       const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

//       if (isOnDashboard) {
//         if (isLoggedIn && isOtpVerified) return true;
//         return false;
//       } else if (isLoggedIn && isOtpVerified) {
//         return Response.redirect(new URL("/dashboard", request.nextUrl));
//       }
//       return true;
//     },
//   },
// };
