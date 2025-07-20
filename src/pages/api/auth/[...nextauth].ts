import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: '126010586447-56kd8nikghvd4348b6uh04lpbhrq5rbt.apps.googleusercontent.com',
      clientSecret: 'I_nY6PbHlj3lflJFq-EtvbAX',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: 'wferonvoerbnoeribe',
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.token = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
