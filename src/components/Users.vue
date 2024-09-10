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
  if (inputLastName.value == "") return;

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
  if (inputFirstName.value == "") return;

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
  if (inputSurName.value == "") return;

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
  <!-- <div class="row">
    <div class="col"> -->
    <table class="table table-hover table__tbody_align">
      <thead>
        <tr class="row row-cols-12 justify-content-md-center">
          <th class="col-1">
            <div @click="sortById" class="table__div_padding table_align table__th_size">ID</div>
            <div>
              <input class="table__inputId_size form-control  table__th_size" type="number" v-model="inputId" @input="searchByInputId">
            </div>
          </th>
          <th class="col-2">
            <div @click="sortByLastName" class="table__div_padding table_align table__th_size">Фамилия</div>
            <div>
              <input class="form-control table__th_size" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputLastName"
                @input="searchByInputLastName">
            </div>
          </th>
          <th class="col-2">
            <div @click="sortByFirstName" class="table__div_padding table_align table__th_size">Имя</div>
            <div>
              <input class="form-control table__th_size" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputFirstName"
                @input="searchByInputFirstName">
            </div>
          </th>
          <th class="col-2">
            <div @click="sortBySurName" class="table__div_padding table_align table__th_size">Отчество</div>
            <div>
              <input class="form-control table__th_size" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)" v-model="inputSurName"
                @input="searchByInputSurName">
            </div>
          </th>

          <th class="col-2">
            <div @click="sortByBirthday" class="table__div_padding table_align table__th_size">Дата рождения</div>
            <div>
              <input class="table__inputDate_size form-control table__th_size" type="date" v-model="inputBirthday"
                @input="searchByInputBirthday">
            </div>
          </th>
          <th class="col-1">
            <div @click="sortByAge" class="table__div_padding table_align table__th_size">Возраст</div>
            <div>
              <input class="table__inputAge_size form-control table__th_size" type="number" v-model="inputAge" @input="searchByInputAge">
            </div>
          </th>
          <th class="col-1"></th>
          <th class="col-1"></th>
        </tr>
      </thead>

      <tbody>
        <tr class="row row-cols-12 justify-content-md-center table__tr_size" v-for="user in users" :key="user.id">
          <td class=" col-1 table_align  table__tr_size">
            {{ user.id }}
          </td>
          <td class="col-2 table_align  table__tr_size">
            {{ user.lastName }}
          </td>
          <td class="col-2 table_align  table__tr_size">
            {{ user.firstName }}
          </td>
          <td class="col-2 table_align  table__tr_size">
            {{ user.surName }}
          </td>

          <td class="col-2 table_align  table__tr_size">
            {{ user.birthday.toISOString().split("T")[0] }}
          </td>
          <td class="col-1 table_align  table__tr_size">
            {{ user.age }}
          </td>
          <td class="col-1 table_align">
            <button type="button" class="btn btn-warning table__button_size" @click="goToEdit(user.id)">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </td>
          <td class="col-1 table_align">
            <button type="button" class="btn btn-danger table__button_size" @click="userDelete(user.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- </div>
</div> -->
</template>

<style scoped>

.table__th_size,
.table__tr_size {
  word-break: break-all;
}

@media (min-width: 0) and (max-width: 767px) {

  .table__th_size { 
font-size: 12px;
}
  .table__tr_size { 
font-size: 14px;  
}
  .table__button_size {
padding: 3px 6px;
  }
}

@media (min-width: 768) and (max-width: 991px) {

.table__th_size { 
font-size: 14px;
}
.table__tr_size { 
font-size: 15px;  
}
.table__button_size {
padding: 4px 9px;
}
}

/* @media (min-width: 577px) and (max-width: 768px) {

.table__th_size { 
font-size: 13px;
word-break: break-all;
font-weight: normal;
}
.table__tr_size { 
font-size: 15px;  
word-break: break-all;
}
.table__button_size {
padding: 5px 7px;
}
} */



/* .table__button_size {
  font-size: 1.5rem;

  padding: 2px;
  margin: 0;
} */

/* } */

/* .table {
  margin-left: auto;
  margin-right: auto;

  border-spacing: 1px;
}
*/ 

/* .table__inputId_size {
  width: 8ch;
}

.table__inputDate_size {
  width: 14.5ch;
}

.table__inputAge_size {
  width: 7.5ch;
}  */

.table_align {
  text-align: center;
}

.table__div_padding {
padding-bottom: 10px;
}

.table_button-margin {
  margin-right: 10px;
}
</style>