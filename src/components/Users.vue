<script setup lang="ts">

import { ref } from "vue";
import { useUsersStore } from "../storages/UseUsersStore";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();
const users = ref(usersStore.users);

const sortEnabledId = ref(false);
const sortEnabledAge = ref(false);
const sortEnabledLastName = ref(false);
const sortEnabledFirstName = ref(false);
const sortEnabledSurName = ref(false);
const sortEnabledBirthday = ref(false);

function compareNumberAsc(number1: number, number2: number) {
  if (number1 > number2) return 1;
  if (number1 == number2) return 0;
  if (number1 < number2) return -1;
}

function compareNumberDesc(number1: number, number2: number) {
  if (number1 > number2) return -1;
  if (number1 == number2) return 0;
  if (number1 < number2) return 1;
}

function sortById(): void {
  if (sortEnabledId.value) {
    usersStore.users.sort((user1, user2): any =>
      compareNumberDesc(user1.id, user2.id)
    );
    sortEnabledId.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareNumberAsc(user1.id, user2.id)
    );
    sortEnabledId.value = true;
  }
}

function sortByAge(): void {
  if (sortEnabledAge.value) {
    usersStore.users.sort((user1, user2): any =>
      compareNumberDesc(user1.age, user2.age)
    );
    sortEnabledAge.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareNumberAsc(user1.age, user2.age)
    );
    sortEnabledAge.value = true;
  }
}

function compareStringAsc(string1: string, string2: string) {
  if (string1.toLowerCase() > string2.toLowerCase()) return 1;
  if (string1.toLowerCase() == string2.toLowerCase()) return 0;
  if (string1.toLowerCase() < string2.toLowerCase()) return -1;
}

function compareStringDesc(string1: string, string2: string) {
  if (string1.toLowerCase() > string2.toLowerCase()) return -1;
  if (string1.toLowerCase() == string2.toLowerCase()) return 0;
  if (string1.toLowerCase() < string2.toLowerCase()) return 1;
}

function sortByLastName() {

  if (sortEnabledLastName.value) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName.value = true;
  }
}

function sortByFirstName() {
  if (sortEnabledFirstName.value) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName.value = true;
  }
}

function sortBySurName() {
  if (sortEnabledSurName.value) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.surName == null ? "" : user1.surName, user2.surName == null ? "" : user2.surName)
    );
    sortEnabledSurName.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.surName == null ? "" : user1.surName, user2.surName == null ? "" : user2.surName)
    );
    sortEnabledSurName.value = true;
  }
}

function compareDateAsc(date1: Date, date2: Date) {
  if (date1 > date2) return 1;
  if (date1 == date2) return 0;
  if (date1 < date2) return -1;
}

function compareDateDesc(date1: Date, date2: Date) {
  if (date1 > date2) return -1;
  if (date1 == date2) return 0;
  if (date1 < date2) return 1;
}

function sortByBirthday() {
  if (sortEnabledBirthday.value) {
    usersStore.users.sort((user1, user2): any =>
      compareDateDesc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday.value = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareDateAsc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday.value = true;
  }
}

function goToEdit(id: number): void {
  router.push(`/EditUser/${id}`);
}

function userDelete(id: number): void {
  usersStore.remove(id);
};


// добавить в инпуты текстовые ФИО - type="text" pattern="и сюда прописать регулярное выражение!" Похимичить с этим - 
//добавила везде type="text" - полезно, т.к. нельзя ввести цифры, но без паттерна, т.к. паттерн срабатывает, только при отправке формы - нам это не подходит

// результат: нельзя будет ввести числа и англ. буквы - сейчас немного кастыльно, сейчас нельзя ввести иностранные буквы

// накатить бутстрап и оформить правитьно шапку


// в верхнем левом углу две кнопочных ссылки все пользователи и добавить нового пользователя
// прибить шапку гвоздями к верхнему углу экрана
// во всю ширину экрана
// new RegExp("\\s"+ a +"\\s");
// ^[А-яЁё]+$

//user.lastName.match(regexp) == null

const inputId = ref<string>("");
const inputAge = ref<string>("");
const inputLastName = ref<string>("");
const inputFirstName = ref<string>("");
const inputSurName = ref<string>("");
const inputBirthday = ref<string>("");

const regexp = /^[А-яЁё]+$/gi;

function searchByInputId() {

  let idNumber = parseInt(inputId.value);

  if (!Number.isNaN(idNumber)) {
    users.value = usersStore.users.filter(user => user.id == idNumber); // приравниваем и отображаем значение только тому, что находит по фильтру
  }
  else {
    users.value = usersStore.users; // сбрасываем список до значения useUsersStore
  }
}

function searchByInputLastName() {
  // добавила проверку: inputLastName.value.match(regexp) != null

  if (inputLastName.value.match(regexp) != null) {
    if (inputLastName.value != null) {
    users.value = usersStore.users.filter(user => user.lastName.toLowerCase().includes(inputLastName.value.toLowerCase()));
  }
  else {
    users.value = usersStore.users;
  }
}
else {
  alert( Error("Фамилия должна содержать только русские буквы"));
  inputLastName.value = "";
}
  }

function searchByInputFirstName() {

  if (inputFirstName.value.match(regexp) != null) {
  if (inputFirstName.value != null) {
    users.value = usersStore.users.filter(user => user.firstName.toLowerCase().includes(inputFirstName.value.toLowerCase()));
  }
  else {
    users.value = usersStore.users;
  }
}
else {
  alert( Error("Имя должно содержать только русские буквы"));
  inputFirstName.value = "";
}
}

function searchByInputSurName() {

  if (inputSurName.value.match(regexp) != null) {
  if (inputSurName.value != null) {
    users.value = usersStore.users.filter(user => user.surName.toLowerCase().includes(inputSurName.value.toLowerCase()));
  }
  else {
    users.value = usersStore.users;
  }
} 
else {
  alert( Error("Отчество должно содержать только русские буквы"));
  inputSurName.value = "";
}
}

function searchByInputBirthday() {

  if (inputBirthday.value.length > 0) {
    const inpBirthday = new Date(inputBirthday.value).toISOString().split("T")[0];
    users.value = usersStore.users.filter(user => user.birthday.toISOString().split("T")[0] == inpBirthday);
  }

  else {
    inputBirthday.value = "0000-00-00";
    users.value = usersStore.users;
  }
}

function searchByInputAge() {
  
  let ageNumber = parseInt(inputAge.value);

  if (!Number.isNaN(ageNumber)) {
    users.value = usersStore.users.filter(user => user.age == ageNumber);
  }
  else {
    users.value = usersStore.users;
  }
}
</script>

<template>
  <div class="users-table">
    <table class="users-table__table">
      <thead class="users-table__group users-table__group_col">
        <tr class="users-table__elem users-table__elem_padding-align">
          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortById">ID</div>
            <div>
              <input class="users-table__elem users-table__elem_outline" type="number" v-model="inputId" @input="searchByInputId">
            </div>
          </th>
          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortByLastName">Фамилия</div>
            <div>
              <input class="users-table__elem users-table__elem_outline" type="text" v-model="inputLastName"
                @input="searchByInputLastName">
            </div>
          </th>
          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortByFirstName">Имя</div>
            <div>
              <input class="users-table__elem users-table__elem_outline" type="text" v-model="inputFirstName"
                @input="searchByInputFirstName">
            </div>
          </th>
          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortBySurName">Отчество</div>
            <div>
              <input class="users-table__elem users-table__elem_outline" type="text" v-model="inputSurName"
                @input="searchByInputSurName">
            </div>
          </th>

          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortByBirthday">Дата рождения</div>
            <div>
              <input class="users-table__elem users-table__elem_outline users-table__elem_date" type="date" v-model="inputBirthday"
                @input="searchByInputBirthday">
            </div>
          </th>
          <th class="users-table__elem users-table__elem_padding-align" scope="col">
            <div @click="sortByAge">Возраст</div>
            <div>
              <input class="users-table__elem users-table__elem_outline" type="number" v-model="inputAge" @input="searchByInputAge">
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="users-table__group users-table__group_col">
        <tr class="users-table__elem users-table__elem-padding" v-for="user in users" :key="user.id">
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.id }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.lastName }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.firstName }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.surName }}
          </td>

          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.birthday.toISOString().split("T")[0] }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.age }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            <button @click="goToEdit(user.id)">Ред</button>
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            <button @click="userDelete(user.id)">Уд</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

/* @media (max-width: 1000px) {
  table {
        width: 600px;

    }
}

@media (min-width: 601px) and (max-width: 1000px) {

  table {
    width: 600px;
}

.users-table__group {
    width: 580px;
}

.button {
    width: 60px;
}
} */


.users-table {
  display: inline-block;
  position: relative;
  margin-right: 20px;
}

.users-table__table {
  position: sticky;
  top: 10px;
  border-collapse: collapse;
  border: 1px solid grey;
  border-radius: 7px;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  -khtml-border-radius: 7px;
  border: 1px solid #000;
  box-shadow: 1px 1px 1px gray;
  display: block;
}

.users-table__elem_padding-align {
  padding: 5px;
  text-align: center;
}

.users-table__elem_outline {
  outline: none;
  box-sizing: border-box;
  width: 50%;
  text-align: center;
}

.users-table__elem_date {
  width: 100%;
}
</style>