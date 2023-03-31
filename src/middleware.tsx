import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET_TOKEN,
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
