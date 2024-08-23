<script setup lang="ts">

import { ref } from "vue";
import { useTableUsStore } from "../tableUs.js";
import { useRouter } from "vue-router";

const router = useRouter();
const tableUs = useTableUsStore();

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
    tableUs.usersTable.sort((user1, user2): any => 
      compareNumberDesc(user1.id, user2.id)
  );
    sortEnabledId.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
      compareNumberAsc(user1.id, user2.id)
    );
    sortEnabledId.value = true;
  }
}

function sortByAge(): void {
  if (sortEnabledAge.value) {
    tableUs.usersTable.sort((user1, user2): any =>
      compareNumberDesc(user1.age, user2.age)
    );
    sortEnabledAge.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
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
    tableUs.usersTable.sort((user1, user2): any =>
      compareStringDesc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
      compareStringAsc(user1.lastName, user2.lastName)
    );
    sortEnabledLastName.value = true;
  }
}

function sortByFirstName() {
  if (sortEnabledFirstName.value) {
    tableUs.usersTable.sort((user1, user2): any =>
      compareStringDesc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
      compareStringAsc(user1.firstName, user2.firstName)
    );
    sortEnabledFirstName.value = true;
  }
}

function sortBySurName() {
  if (sortEnabledSurName.value) {
    tableUs.usersTable.sort((user1, user2): any =>
         compareStringDesc(user1.surName == null ? "" : user1.surName, user2.surName == null ? "" : user2.surName)
  );
    sortEnabledSurName.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
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
    tableUs.usersTable.sort((user1, user2): any =>
      compareDateDesc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday.value = false;
  } else {
    tableUs.usersTable.sort((user1, user2): any =>
      compareDateAsc(user1.birthday, user2.birthday)
    );
    sortEnabledBirthday.value = true;
  }
}

function goToEdit(id:number): void {
  router.push(`/EditUser/${id}`);
}
</script>

<template>
  <div class="users-table">
    <table class="users-table__table">
      <thead class="users-table__group users-table__group_col">
        <tr class="users-table__elem users-table__elem_padding-align">
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortById"
          >
            ID
          </th>
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortByLastName"
          >
            Фамилия
          </th>
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortByFirstName"
          >
            Имя
          </th>
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortBySurName"
          >
            Отчество
          </th>

          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortByBirthday"
          >
            Дата рождения
          </th>
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
            @click="sortByAge"
          >
            Возраст
          </th>
          <th
            class="users-table__elem users-table__elem_padding-align"
            scope="col"
          >
          </th>
        </tr>
      </thead>

      <tbody class="users-table__group users-table__group_col">
        <tr
          class="users-table__elem users-table__elem-padding"
          v-for="user in tableUs.usersTable"
          :key="user.id"
        >
          <td class="users-table__elem users-table__elem_padding-align"
           >
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
            {{ new Intl.DateTimeFormat("ru").format(user.birthday) }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            {{ user.age }}
          </td>
          <td class="users-table__elem users-table__elem_padding-align">
            <button @click="goToEdit(user.id)">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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
</style>