import { defineStore } from 'pinia';
import { User } from "../models/User";
import type { IUserAdd } from '../models/IUserAdd'; 
import type { IUserEdit } from '../models/IUserEdit'; 
// import { UsersClient } from '../api/usersClient';

export const useUsersStore = defineStore('users-store', () => {


    // async function getUsers() {
    //     return await UsersClient.getUsers();
    // }

    // async function getMaxId(): Promise<number> {
    //     let maxId = -1;
    //     for (let user of users) {
    //         if (user.id > maxId) {
    //             maxId = user.id;
    //         }
    //     }
    //     return maxId;
    // }

    // function create(user:IUserAdd): void {
    //     let id = getMaxId() + 1;
    //     const newUser = new User(id, user.firstName, user.lastName, user.surName, user.birthday);
    //     users.push(newUser);        
    // }

    // function update(userUpdate:IUserEdit): void {

    //     const findedUser = users.find(user => user.id == userUpdate.id);

    //     if (findedUser == null) {
    //         throw Error("Пользователь не найден");
    //     }

    //     findedUser.update(userUpdate);
    // }

    // function remove(id: number): void {

    //     const userDelete = users.findIndex(user => user.id == id);
    //     users.splice(userDelete, 1);
    // }

    // return { users, create, update, remove }

    // return { getUsers }
})

