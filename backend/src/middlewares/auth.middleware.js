import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new ApiError("No token provided", StatusCodesEnum.UNAUTHORIZED);
            }
            const accessToken = authorizationHeader.split(" ")[1];
            if (!accessToken) {
                throw new ApiError("No token provided", StatusCodesEnum.UNAUTHORIZED);
            }
            const tokenPayload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
            const isTokenExists = await tokenService.isTokenExists(accessToken, TokenTypeEnum.ACCESS);
            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
            }
            const isActive = await userService.isActive(tokenPayload.userId);
            if (!isActive) {
                throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw new ApiError("No refresh token provided", StatusCodesEnum.FORBIDDEN);
            }
            const tokenPayload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);
            const isTokenExists = await tokenService.isTokenExists(refreshToken, TokenTypeEnum.REFRESH);
            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isAdmin(req, res, next) {
        try {
            const { role } = req.res.locals.tokenPayload;
            if (role !== RoleEnum.ADMIN) {
                throw new ApiError("No has permissions", StatusCodesEnum.FORBIDDEN);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
