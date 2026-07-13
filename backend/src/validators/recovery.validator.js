import joi from "joi";
export class RecoveryValidator {
    static emailField = joi.string().trim();
    static emailSchema = joi.object({
        email: this.emailField.required(),
    });
}
