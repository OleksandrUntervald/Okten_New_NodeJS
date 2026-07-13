import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { userService } from "../services/user.service";
class UserController {
    async getAll(req, res, next) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const user = req.body;
            const data = await userService.updateById(id, user);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        }
        catch (e) {
            next(e);
        }
    }
    async blockUser(req, res, next) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload;
            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.blockUser(userId);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async unBblockUser(req, res, next) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload;
            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.unBlockUser(userId);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
