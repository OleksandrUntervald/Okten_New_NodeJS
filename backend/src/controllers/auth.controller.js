import { StatusCodesEnum } from "../enums/status-codes.enum";
import { tokenRepository } from "../repositories/token.repository";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";
class AuthController {
    async signUp(req, res, next) {
        try {
            const body = req.body;
            const data = await authService.signUp(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async signIn(req, res, next) {
        try {
            const dto = req.body;
            const data = await authService.signIn(dto);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async me(req, res, next) {
        try {
            const tokenPayload = res.locals.tokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodesEnum.OK).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { role, userId } = req.res.locals
                .tokenPayload;
            const tokens = tokenService.generateTokens({ role, userId });
            await tokenRepository.create({
                ...tokens,
                _userId: userId,
            });
            res.status(StatusCodesEnum.OK).json(tokens);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const { token } = req.params;
            const user = await authService.activate(token);
            res.status(StatusCodesEnum.OK).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async passwordRecoveryRequest(req, res, next) {
        try {
            const { email } = req.body;
            const user = await userService.getByEmail(email);
            if (user) {
                await authService.recoveryPasswordRequest(user);
            }
            res.status(StatusCodesEnum.OK).json({
                details: "Check your email",
            });
        }
        catch (e) {
            next(e);
        }
    }
    async recoveryPassword(req, res, next) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const user = await authService.recoveryPassword(token, password);
            res.status(StatusCodesEnum.OK).json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
