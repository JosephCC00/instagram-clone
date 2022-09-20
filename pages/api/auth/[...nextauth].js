import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Basically creating a new username based on people's name
      // Martin Wong
      // martinwong
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },

  /**
   * !! Optional: we can just theme up the default login page below
   * */
  // theme: {
  //   logo: "https://links.papareact.com/sq0",
  //   brandColor: "#F13287",
  //   colorScheme: "auto",
  // },
};
export default NextAuth(authOptions);
