import dotenv from "dotenv";
dotenv.config();
const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    JWT_ACTIVATE_LIFETIME: process.env.JWT_ACTIVATE_LIFETIME,
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET,
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
export { config };
