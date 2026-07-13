import { User } from "../models/user.model";
class UserRepository {
    getAll() {
        return User.find();
    }
    create(user) {
        return User.create(user);
    }
    getById(userId) {
        return User.findById(userId);
    }
    updateById(userId, user) {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }
    deleteById(userId) {
        return User.findByIdAndDelete(userId);
    }
    getByEmail(email) {
        return User.findOne({ email });
    }
    blockUser(userId) {
        return User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }
    unBlockUser(userId) {
        return User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    }
}
export const userRepository = new UserRepository();
