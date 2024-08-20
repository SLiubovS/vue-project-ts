import { defineStore } from 'pinia'
import { ref } from "vue";
import { User } from "./mainUsers/user";

export const useTableUsStore = defineStore('tableUs', () => {

    const usersTable = ref([
        new User(5, "Александр", "Соловьев", "Анатольевич", new Date("1961, 06, 27")),
        new User(2, "Любовь", "Соловьева", "Салаватовна", new Date("1994, 04, 13")),
        new User(3, "Кисяо", "Соловьева", "", new Date("2019, 08, 19")),
        new User(4, "Майя", "Гареева", "Эдуардовна", new Date("1966, 04, 30")),
        new User(1, "Лариса", "Соловьева", "Николаевна", new Date("1968, 04, 12")),
    ])

    function getMaxId() {
        let maxId = -1;
        for (let user of usersTable.value) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        return maxId;
    }

    function userCreated(firstName, lastName, surName, birthday) {
        let id = getMaxId() + 1;
        const NewUser = new User(id, firstName, lastName, surName, birthday);
        usersTable.value.push(NewUser);
    }
    return { usersTable, userCreated }
})

