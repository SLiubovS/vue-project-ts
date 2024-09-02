import { defineStore } from 'pinia';
import { ref } from "vue";
import { User } from "../models/User";
import { defineAge } from "../helpers/DateHelpers";
import type { IUserAdd } from '../models/IUserAdd'; 
import type { IUserEdit } from '../models/IUserEdit'; 

export const useUsersStore = defineStore('users-store', () => {

    const users = ref<User[]>([
        new User(5, "Александр", "Соловьев", "Анатольевич", new Date("1961, 06, 27")),
        new User(2, "Любовь", "Соловьева", "Салаватовна", new Date("1994, 04, 13")),
        new User(3, "Кисяо", "Соловьева", "", new Date("2019, 08, 19")),
        new User(4, "Майя", "Гареева", "Эдуардовна", new Date("1966, 04, 30")),
        new User(1, "Лариса", "Соловьева", "Николаевна", new Date("1968, 04, 12")),
    ])

    function getMaxId(): number {
        let maxId = -1;
        for (let user of users.value) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        return maxId;
    }

    function create(user:IUserAdd): void {
        let id = getMaxId() + 1;
        if (user.firstName !== null && user.lastName !== null && user.birthday != null) {
        const newUser = new User(id, user.firstName, user.lastName, user.surName, new Date(user.birthday));
        users.value.push(newUser);
        }
    }

    function update(userUpdate:IUserEdit): void {

        const findedUser = users.value.find(user => user.id == userUpdate.id);

        if (findedUser == null) {
            throw Error();
        }

        findedUser.firstName = userUpdate.firstName;
        findedUser.lastName = userUpdate.lastName;
        findedUser.surName = userUpdate.surName;
        findedUser.birthday = new Date(userUpdate.birthday);
        findedUser.age = defineAge(findedUser.birthday);
    }

    function remove(id: number): void {

        const userDelete = users.value.findIndex(user => user.id == id);
        users.value.splice(userDelete, 1);
    }

    return { users, create, update, remove }
})

