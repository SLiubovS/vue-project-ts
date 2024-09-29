import { defineStore } from 'pinia';
import { User } from "../models/User";
import type { IUserAdd } from '../models/IUserAdd'; 
import type { IUserEdit } from '../models/IUserEdit'; 

export const useUsersStore = defineStore('users-store', () => {

    const users = [
        new User(5, "Александр", "Соловьев", "Анатольевич", "1961-06-27T00:00:00.000+03:00"),
        new User(2, "Любовь", "Соловьева", "Салаватовна", "1994-04-13T00:00:00.000+03:00"),
        new User(3, "Кисяо", "Соловьева", null, "2019-08-19T00:00:00.000+03:00"),
        new User(4, "Майя", "Гареева", "Эдуардовна", "1966-04-30T00:00:00.000+03:00"),
        new User(1, "Лариса", "Соловьева", "Николаевна", "1968-04-12T00:00:00.000+03:00"),
    ];

    function getMaxId(): number {
        let maxId = -1;
        for (let user of users) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        return maxId;
    }

    function create(user:IUserAdd): void {
        let id = getMaxId() + 1;
        const newUser = new User(id, user.firstName, user.lastName, user.surName, user.birthday);
        users.push(newUser);        
    }

    function update(userUpdate:IUserEdit): void {

        const findedUser = users.find(user => user.id == userUpdate.id);

        if (findedUser == null) {
            throw Error("Пользователь не найден");
        }

        findedUser.update(userUpdate);
    }

    function remove(id: number): void {

        const userDelete = users.findIndex(user => user.id == id);
        users.splice(userDelete, 1);
    }

    return { users, create, update, remove }
})

