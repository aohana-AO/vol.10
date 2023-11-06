import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
    // publicRoutesで、認証されていない人でも見れるページを指定します
    // 今回の場合はホームページだけログインしてなくても見れるようにしています
    publicRoutes: ["/"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};