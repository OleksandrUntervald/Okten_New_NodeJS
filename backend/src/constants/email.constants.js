import { EmailEnum } from "../enums/email.enum";
export const emailConstants = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.ACTIVATE]: {
        subject: "Activate Account",
        template: "activate",
    },
    [EmailEnum.RECOVERY]: {
        subject: "Recovery password",
        template: "recovery",
    },
};
