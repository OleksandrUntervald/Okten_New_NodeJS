import joi from "joi";
import { RegexEnum } from "../enums/regex.enum";
export class UserValidator {
    static email = joi.string().email().trim();
    static password = joi.string().regex(RegexEnum.PASSWORD);
    static name = joi.string().regex(RegexEnum.NAME);
    static surname = joi.string().regex(RegexEnum.NAME);
    static age = joi.number().min(2).max(100);
    static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
    static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
