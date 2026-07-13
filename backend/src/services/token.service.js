import jwt from "jsonwebtoken";
import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    verifyToken(token, type) {
        try {
            let secret;
            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenTypeEnum.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenTypeEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                default:
                    throw new ApiError("Invalid token type", StatusCodesEnum.BED_REQUEST);
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }
    generateActionToken(payload, type) {
        let secret;
        let expiresIn;
        switch (type) {
            case ActionTokenTypeEnum.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenTypeEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError("Invalid action token type", 400);
        }
        return jwt.sign(payload, secret, { expiresIn });
    }
    async isTokenExists(token, type) {
        const iTokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!iTokenPromise;
    }
}
export const tokenService = new TokenService();
