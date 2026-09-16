import dotenv from "dotenv";
dotenv.config();
const requiredEnvVariables = [
    "PORT",
    "MONGODB_URI",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "PEXELS_API_KEY",
];
for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}
export const env = {
    port: Number(process.env.PORT),
    mongodbUri: process.env.MONGODB_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    pexelsApiKey: process.env.PEXELS_API_KEY,
};
//# sourceMappingURL=env.js.map