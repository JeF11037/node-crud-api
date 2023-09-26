import { v4 as uuidv4 } from 'uuid';

interface User_data
{
    username: string,
    age: number,
    hobbies: Array<string>
}

interface User extends User_data
{
    id: string
}

const DB_USERS = new Array<User>;

class UserController 
{
    async getUsers() 
    {
        return new Promise((resolve, _) => {
            resolve(DB_USERS)
        });
    }

    async getUser(id: string) 
    {
        return new Promise((resolve, reject) => {
            const user = DB_USERS.find((user) => user.id === id);
            if (!user) 
            {
                reject(400);
                return;
            }
            resolve(user);
        });
    }

    async createUser(user_data: User_data) 
    {
        return new Promise((resolve, reject) => {
            const user: User = {
                id: uuidv4(),
                ...user_data,
            };
            if (!user.id || !user.username || !user.age || !user.hobbies)
            {
                reject(400);
                return
            }
            if (user.id === undefined || user.username === undefined || user.age === undefined)
            {
                reject(400);
                return
            }
            DB_USERS.push(user);
            resolve(user);
        });
    }

    async updateUser(id: string, user_data: User_data) 
    {
        return new Promise((resolve, reject) => {
            const user = DB_USERS.find((user) => user.id === id);
            if (!user) 
            {
                reject(400);
                return;
            }
            const updated_user: User = {
                id: user.id,
                username: user_data.username || user.username,
                age: user_data.age || user.age,
                hobbies: user_data.hobbies || user.hobbies
            };
            DB_USERS[DB_USERS.indexOf(user)] = updated_user;
            resolve(updated_user);
        });
    }

    async deleteUser(id: string) 
    {
        return new Promise((resolve, reject) => {
            const user = DB_USERS.find((user) => user.id === id);
            if (!user) {
                reject(400);
                return;
            }
            const index = DB_USERS.indexOf(user, 0);
            if (index > -1) {
                DB_USERS.splice(index, 1);
            }
            resolve(user);
        });
    }
}

export
{
    UserController,
    User,
    User_data
}