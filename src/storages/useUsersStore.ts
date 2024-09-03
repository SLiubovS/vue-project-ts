import { defineStore } from 'pinia';
import { ref } from "vue";
import { User } from "../models/User";
import type { IUserAdd } from '../models/IUserAdd'; 
import type { IUserEdit } from '../models/IUserEdit'; 

export const useUsersStore = defineStore('users-store', () => {

    const users = ref<User[]>([
        new User(5, "Александр", "Соловьев", "Анатольевич", new Date("1961, 06, 27")),
        new User(2, "Любовь", "Соловьева", "Салаватовна", new Date("1994, 04, 13")),
        new User(3, "Кисяо", "Соловьева", "", new Date("2019, 08, 19")),
        new User(4, "Майя", "Гареева", "Эдуардовна", new Date("1966, 04, 30")),
        new User(1, "Лариса", "Соловьева", "Николаевна", new Date("1968, 04, 12")),
        new User(6, "a", "a", "a", new Date("1968, 04, 12")),
        new User(7, "б", "б", "б", new Date("1968, 04, 12")),
        new User(8, "вввввв", "в", "в", new Date("1968, 04, 12")),
        new User(9, "ггг", "ггг", "г", new Date("1968, 04, 12")),
        new User(10, "дд", "д", "ддддд", new Date("1968, 04, 12")),
        new User(11, "е", "е", "е", new Date("1968, 04, 12")),
        new User(12, "жжжжж", "жжжж", "жжжжжж", new Date("1968, 04, 12")),
        new User(13, "ззззз", "з", "з", new Date("1968, 04, 12")),
        new User(14, "и", "иииииии", "и", new Date("1968, 04, 12")),
        new User(15, "к", "к", "кккккккккк", new Date("1968, 04, 12")),
        new User(16, "лллллл", "ллллллл", "ллллллл", new Date("1968, 04, 12")),
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
        
        if (user.firstName == null)
            throw Error("Имя не заполнено");

        if (user.lastName == null)
            throw Error("Фамилия не заполнена");

        if (user.birthday == null)
            throw Error("Дата рождения не заполнена");

        let id = getMaxId() + 1;
        const newUser = new User(id, user.firstName, user.lastName, user.surName, new Date(user.birthday));
        users.value.push(newUser);        
    }

    function update(userUpdate:IUserEdit): void {

        const findedUser = users.value.find(user => user.id == userUpdate.id);

        if (findedUser == null) {
            throw Error("Пользователь не найден");
        }

        findedUser.firstName = userUpdate.firstName;
        findedUser.lastName = userUpdate.lastName;
        findedUser.surName = userUpdate.surName;
        findedUser.birthday = new Date(userUpdate.birthday);
    }

    function remove(id: number): void {

        const userDelete = users.value.findIndex(user => user.id == id);
        users.value.splice(userDelete, 1);
    }

    return { users, create, update, remove }
})

