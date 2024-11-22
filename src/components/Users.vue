<script setup lang="ts">

import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import _ from 'lodash';
import moment from 'moment';
import type { IUser } from '../models/IUser';
import { extractDate } from '../helpers/DateHelpers';
import { useAxiosStore } from '../stopages/UseAxiosStore';

const router = useRouter();
const users: Ref<Array<IUser>> = ref([]);
const usersImmutable: Ref<Array<IUser>> = ref([]);

const axiosStore = useAxiosStore();

// запрашиваем пользователей после того как компонент был смотнирован
onMounted(() => getListUsers());

function getListUsers() {
  axiosStore.getUsers()
    .then(response => {
      const usersServer = response.data as Array<IUser>;
      usersServer.forEach(userServer => userServer.birthday = extractDate(userServer.birthday));
      users.value = usersServer;
      usersImmutable.value = usersServer;
    });
}

const sortOrder: { [key: string]: boolean } = {
  id: true,
  age: true,
  lastName: true,
  firstName: true,
  surName: true,
  birthday: true
};

const filterInput: Ref<{ [key: string]: string }> = ref({
  id: '',
  age: '',
  lastName: '',
  firstName: '',
  surName: '',
  birthday: ''
});

function sortBy(field: string): void {
  users.value = _.orderBy(users.value, field, sortOrder[field] ? 'asc' : 'desc');
  sortOrder[field] = !sortOrder[field];
}

function searchByNumber(field: 'id' | 'age'): void {

  const value = parseInt(filterInput.value[field]);

  if (!Number.isNaN(value)) {
    users.value = usersImmutable.value.filter(user => user[field] == value);
  }
  else {
    users.value = usersImmutable.value;
  }
}

function searchByName(field: 'lastName' | 'firstName' | 'surName'): void {

  const value = filterInput.value[field];

  if (value.length > 0) {
    users.value = usersImmutable.value.filter(user => user[field]?.toLowerCase().includes(value.toLowerCase()));
  }
  else {
    users.value = usersImmutable.value;
  }
}

function searchByDate(field: 'birthday'): void {

  const value = filterInput.value[field];

  if (value.length > 0) {
    const inputDate = moment(value).toISOString(true).split('T')[0];
    users.value = usersImmutable.value.filter(user => moment(user.birthday).toISOString(true).split('T')[0] == inputDate);
  }
  else {
    filterInput.value[field] = '0000-00-00';
    users.value = usersImmutable.value;
  }
}

function goToEdit(id: number): void {
  router.push(`EditUser/${id}`);
}

function userDelete(id: number): void {

  axiosStore.deleteUser(id)
    .then(() => {
      getListUsers();
    });
}
</script>

<template>
  <div class="container table-responsive-lg">
    <table class="table table-hover table-responsive-lg">
      <thead>
        <tr scope="row">
          <th scope="col-1" class="table__input_size">
            <div @click="sortBy('id')" class="table__div_padding table_align">ID</div>
            <div>
              <input class="form-control form-control" type="number" v-model="filterInput.id"
                @input="searchByNumber('id')" placeholder="поиск по id">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortBy('lastName')" class="table__div_padding table_align">Фамилия</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)"
                v-model="filterInput.lastName" placeholder="по фамилии" @input="searchByName('lastName')">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortBy('firstName')" class="table__div_padding table_align">Имя</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)"
                v-model="filterInput.firstName" placeholder="по имени" @input="searchByName('firstName')">
            </div>
          </th>
          <th scope="col-2">
            <div @click="sortBy('surName')" class="table__div_padding table_align">Отчество</div>
            <div>
              <input class="form-control" type="text" size="10" oninput="this.size=Math.max(this.value.length, 10)"
                v-model="filterInput.surName" placeholder="по отчеству" @input="searchByName('surName')">
            </div>
          </th>

          <th scope="col-2" class="table__input_size">
            <div @click="sortBy('birthday')" class="table__div_padding table_align">Дата рождения</div>
            <div>
              <input class="form-control" type="date" v-model="filterInput.birthday" @input="searchByDate('birthday')">
            </div>
          </th>
          <th scope="col-1" class="table__input_size">
            <div @click="sortBy('age')" class="table__div_padding table_align">Возраст</div>
            <div>
              <input class="form-control" type="number" v-model="filterInput.age" @input="searchByNumber('age')"
                placeholder="по возрасту">
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
            {{ user.birthday }}
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
  color: rgba(216, 215, 216, 0.897);
  font-size: 14px;
}
</style>