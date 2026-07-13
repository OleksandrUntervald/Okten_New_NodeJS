import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";
class AuthService {
    async signUp(user) {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });
        const token = tokenService.generateActionToken({ userId: newUser._id, role: newUser.role }, ActionTokenTypeEnum.ACTIVATE);
        await emailService.sendEmail(newUser.email, emailConstants[EmailEnum.ACTIVATE], {
            name: newUser.name,
            url: `${config.FRONTEND_URL}/activate/${token}`,
        });
        return { user: newUser, tokens };
    }
    async signIn(dto) {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("Email or password invalid", StatusCodesEnum.UNAUTHORIZED);
        }
        const isValidPassword = await passwordService.comparePassword(dto.password, user.password);
        if (!user.isActive) {
            throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
        }
        if (!isValidPassword) {
            throw new ApiError("Invalid email or password", StatusCodesEnum.UNAUTHORIZED);
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }
    async activate(token) {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.ACTIVATE);
        return await userService.updateById(userId, { isActive: true });
    }
    async recoveryPasswordRequest(user) {
        const token = tokenService.generateActionToken({
            userId: user._id,
            role: user.role,
        }, ActionTokenTypeEnum.RECOVERY);
        const url = `${config.FRONTEND_URL}/recovery/${token}`;
        await emailService.sendEmail(user.email, emailConstants[EmailEnum.RECOVERY], { url });
    }
    async recoveryPassword(token, password) {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.RECOVERY);
        const hashedPassword = await passwordService.hashPassword(password);
        return await userService.updateById(userId, {
            password: hashedPassword,
        });
    }
}
export const authService = new AuthService();
