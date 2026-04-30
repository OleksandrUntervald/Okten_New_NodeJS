const {read, write} = require('../services/fs.service');

class UserRepository{
    async getAll(){
        return read()
    }

    async create(user){
        const users = await read();
        const newUser = {
            id:users.length?users[users.length-1].id+1 :1,
            name: user.name,
            surname: user.surname,
            age: user.age
        }
        users.push(newUser);
        await write(users);
        return newUser
    }

    async getById(id){
        const users = await read()
        const index = users.findIndex(user => user.id === Number(id))
        return users[index]
    }
    async updateById(id, user){
        const users = await read();
        const index = users.findIndex(u => u.id === Number(id));
        if (index === -1) {
            return null;
        }
        const updatedUser = {
            ...users[index],
            ...user,
            id: Number(id)
        };
        users[index] = updatedUser;
        await write(users);
        return updatedUser;
    }

    async deleteById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users.splice(index, 1);
        await write(users)
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}