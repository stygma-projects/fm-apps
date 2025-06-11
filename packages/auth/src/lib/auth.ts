import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@fm-apps/db";
 
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    // basePath: "/ba/auth",
    database: prismaAdapter(prisma, {
        provider: "mysql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {  
        enabled: true
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 // Cache duration in seconds
        }
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    
});