import joi from "joi";
import { RegexEnum } from "../enums/regex.enum";
export class AuthValidator {
    static refresh = joi.string().trim();
    static password = joi.string().regex(RegexEnum.PASSWORD);
    static refreshToken = joi.object({
        refreshToken: this.refresh.required(),
    });
    static validatePassword = joi.object({
        password: this.password.required(),
    });
}
