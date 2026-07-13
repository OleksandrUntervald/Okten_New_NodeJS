import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
class UserService {
    getAll() {
        return userRepository.getAll();
    }
    create(user) {
        return userRepository.create(user);
    }
    async getById(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    async updateById(userId, user) {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.updateById(userId, user);
    }
    async deleteById(userId) {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.deleteById(userId);
    }
    async isEmailUnique(email) {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("User is already exists", StatusCodesEnum.BED_REQUEST);
        }
    }
    async isActive(id) {
        const user = await this.getById(id);
        return user.isActive;
    }
    blockUser(user_id) {
        return userRepository.blockUser(user_id);
    }
    unBlockUser(user_id) {
        return userRepository.unBlockUser(user_id);
    }
    getByEmail(email) {
        return userRepository.getByEmail(email);
    }
}
export const userService = new UserService();
