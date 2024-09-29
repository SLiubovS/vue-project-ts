<script setup lang="ts">

import { ref } from "vue";
import { useUsersStore } from "../storages/UseUsersStore";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();
const users = ref(usersStore.users);

let sortEnabledId = false;
let sortEnabledAge = false;
let sortEnabledLastName = false;
let sortEnabledFirstName = false;
let sortEnabledSurName = false;
let sortEnabledBirthday = false;

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
  if (sortEnabledId) {
    usersStore.users.sort((user1, user2): any =>
      compareNumberDesc(user1.id, user2.id)
    );
    sortEnabledId = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareNumberAsc(user1.id, user2.id)
    );
    sortEnabledId = true;
  }
}

function sortByAge(): void {
  if (sortEnabledAge) {
    usersStore.users.sort((user1, user2): any =>
      compareNumberDesc(user1.age, user2.age)
    );
    sortEnabledAge = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareNumberAsc(user1.age, user2.age)
    );
    sortEnabledAge = true;
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

  if (sortEnabledLastName) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName = true;
  }
}

function sortByFirstName() {
  if (sortEnabledFirstName) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName = true;
  }
}

function sortBySurName() {
  if (sortEnabledSurName) {
    usersStore.users.sort((user1, user2): any =>
      compareStringDesc(user1.surName == null ? "" : user1.surName, user2.surName == null ? "" : user2.surName)
    );
    sortEnabledSurName = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareStringAsc(user1.surName == null ? "" : user1.surName, user2.surName == null ? "" : user2.surName)
    );
    sortEnabledSurName = true;
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
  if (sortEnabledBirthday) {
    usersStore.users.sort((user1, user2): any =>
      compareDateDesc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday = false;
  } else {
    usersStore.users.sort((user1, user2): any =>
      compareDateAsc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday = true;
  }
}

function goToEdit(id: number): void {
  router.push(`/EditUser/${id}`);
}

function userDelete(id: number): void {
  usersStore.remove(id);
};

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
    users.value = usersStore.users.filter(user => user.id == idNumber);
  }
  else {
    users.value = usersStore.users; 
  }
}

function searchByInputLastName() {

  if (inputLastName.value.match(regexp) != null) {
    if (inputLastName.value != null) {
    users.value = usersStore.users.filter(user => user.lastName.toLowerCase().includes(inputLastName.value.toLowerCase()));
  }
  else {
    users.value = usersStore.users;
  }
}
else {
  if (inputLastName.value == "") {
    users.value = usersStore.users;
  }
  else {
  alert( Error("Фамилия должна содержать только русские буквы"));
  inputLastName.value = "";
  }
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
  if (inputFirstName.value == "") {
    users.value = usersStore.users;
  }
  else {
    alert( Error("Имя должно содержать только русские буквы"));
    inputFirstName.value = "";
  }
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
  if (inputSurName.value == "") {
    users.value = usersStore.users;
  }
  else {
  alert( Error("Отчество должно содержать только русские буквы"));
  inputSurName.value = "";
  }
}
}

const color = ref(true);
function searchByInputBirthday() {

  if (inputBirthday.value.length > 0) {
    color.value = false;
    const inpBirthday = new Date(inputBirthday.value).toISOString().split("T")[0];
    users.value = usersStore.users.filter(user => user.birthday.toISOString().split("T")[0] == inpBirthday);
  }

  else {
    inputBirthday.value = "0000-00-00";
    users.value = usersStore.users;
    color.value = true;
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

  <div class="container table-responsive-lg">
    <table class="table table-hover table-responsive-lg">
      <thead>
        <tr scope="row">
          <th scope="col-1" class="table__input_size">
            <div @click="sortById" class="table__div_padding table_align">ID</div>
            <div>
              <input class="form-control form-control" type="number" v-model="inputId" @input="searchByInputId" placeholder="поиск по id">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortByLastName" class="table__div_padding table_align">Фамилия</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputLastName" placeholder="по фамилии"
                @input="searchByInputLastName">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortByFirstName" class="table__div_padding table_align">Имя</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputFirstName" placeholder="по имени"
                @input="searchByInputFirstName">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortBySurName" class="table__div_padding table_align">Отчество</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputSurName" placeholder="по отчеству"
                @input="searchByInputSurName">
            </div>
          </th>

          <th scope="col-2" class="table__input_size">
            <div @click="sortByBirthday" class="table__div_padding table_align">Дата рождения</div>
            <div>
              <input class="form-control color" type="date" v-model="inputBirthday"
                @input="searchByInputBirthday"
                :class="{ 'date_color': color }"
                >
            </div>
          </th>
          <th scope="col-1"  class="table__input_size">
            <div @click="sortByAge" class="table__div_padding table_align">Возраст</div>
            <div>
              <input class="form-control" type="number" v-model="inputAge" @input="searchByInputAge" placeholder="по возрасту">
            </div>
          </th>
          <th scope="col-1"></th>
          <th scope="col-1"></th>
        </tr>
      </thead>

      <tbody class="table-group-divider">
        <tr scope="row" v-for="user in users" :key="user.id">
          <td class="table_align" scope="col-1">
            {{ user.id }}
          </td>
          <td class="table_align" scope="col-2">
            {{ user.lastName }}
          </td>
          <td class="table_align" scope="col-2">
            {{ user.firstName }}
          </td>
          <td class="table_align" scope="col-2">
            {{ user.surName }}
          </td>

          <td class="table_align" scope="col-2">
            {{ user.birthday.toLocaleDateString("ru-RU") }}
          </td>
          <td class="table_align" scope="col-1">
            {{ user.age }}
          </td>
          <td class="table_align" scope="col-1">
            <button type="button" class="btn btn-warning" @click="goToEdit(user.id)">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </td>
          <td class="table_align" scope="col-1">
            <button type="button" class="btn btn-danger" @click="userDelete(user.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</div>

</template>

<style scoped>

.table__input_size {
  width: 14.5ch;
  min-width: 8ch;
}

.table-group-divider {
  border-top-color: #0d6efd;
}

.table_align {
  text-align: center;
}

.table__div_padding {
padding-bottom: 10px;
}

.table_button-margin {
  margin-right: 10px;
}

input::placeholder {
  color:rgba(216, 215, 216, 0.897);
  font-size: 14px;
}

input[type="date"] {
  color:black;
}


input[type="date"].date_color {
  color:rgba(216, 215, 216, 0.897);
  }
/* input[type="date"]:not([value="дд.мм.гггг"]) {
  color:rgba(216, 215, 216, 0.897);
  } */


  
  /* input[type="date"]:not([value=""]) {
    color:rgba(216, 215, 216, 0.897);
  }

  input[type="date"] {
    background-color: rgba(216, 215, 216, 0.897);
  /* color:black !important;  */
/* } */ 

/* input[type="date"] {
  color:rgba(216, 215, 216, 0.897);
}

input[type="date"]:focus {
  color:black;
} */
</style>