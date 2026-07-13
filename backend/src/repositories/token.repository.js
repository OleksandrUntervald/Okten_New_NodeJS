import { Token } from "../models/token.model";
class TokenRepository {
    create(tokenModel) {
        return Token.create(tokenModel);
    }
    findByParams(params) {
        return Token.findOne(params);
    }
}
export const tokenRepository = new TokenRepository();
