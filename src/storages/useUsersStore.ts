import { defineStore } from 'pinia'
import { ref } from "vue";
import { User } from "../models/user";
import { defineAge } from "../helpers/dateHelpers"

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

    function create(firstName: string, lastName: string, surName: string | null, birthday: Date): void {
        let id = getMaxId() + 1;
        const user = new User(id, firstName, lastName, surName, birthday);
        users.value.push(user);
    }

    function update(id: number, firstName: string, lastName: string, surName: string | null, birthday: Date): void {

        const findedUser = users.value.find(user => user.id == id);

        if (findedUser == null) {
            throw Error();
        }

        findedUser.firstName = firstName;
        findedUser.lastName = lastName;
        findedUser.surName = surName;
        findedUser.birthday = birthday;
        findedUser.age = defineAge(birthday);
    }

    function remove(id: number): void {

        const userDelete = users.value.findIndex(user => user.id == id);
        users.value.splice(userDelete, 1);
    }

    return { users, create, update, remove }
})

