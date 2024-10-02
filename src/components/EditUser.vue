<script setup lang="ts">

import { ref } from "vue";
import type { Ref } from "vue";
import { ValidationResult } from "../validators/ValidationResult";
import { useRouter } from "vue-router";
import type { IUserData } from "../models/IUserData";
import type { IUserEdit } from "../models/IUserEdit";
import type { IUserAdd } from "../models/IUserAdd";
import { UserDataValidator } from "../validators/UserDataValidator";
import moment from "moment";
import { UsersClient } from "../api/usersClient";
import type { IUser } from "../models/IUser";


const router = useRouter();
const isAdd = ref<boolean>(false);
const users: Ref<Array<IUser>> = ref([]);

// запрашиваем пользователей с сервера
UsersClient.getUsers(users);

const user = ref<IUserData>({
  id: null,
  lastName: null,
  firstName: null,
  surName: null,
  birthday: null
});

const props = defineProps({
  id: String
})

if (props.id == null) {
  isAdd.value = true;
}

if (!isAdd.value) {
  if (props.id == null) {
    throw Error("Id пользователя не указан");
  }
  let id = parseInt(props.id);

  UsersClient.getOneUser(id, user);
  // строка ниже не отрабатывает
  //user.value.birthday = moment(user.value.birthday).toISOString(true).split("T")[0]; 




  //   if (findedUser == null) {
  //   throw Error(`Пользователь c id=${user.value.id} не найден`);
  //  }

  //  user.value = findedUser.lastName;
  //  user.value.firstName = findedUser.firstName;
  //  user.value.surName = findedUser.surName;
  //  user.value.birthday = moment(findedUser.birthday).toISOString(true).split("T")[0]; // формат yyyy-MM-dd с сохранение частового пояса
}

// сделать результат валидации объектом, у которого полями должны быть названиями lastName, firstName, surName, birthday

const validationData: Ref<{ [key: string]: Array<string>; }> = ref({
  lastName: [],
  firstName: [],
  surName: [],
  birthday: []
});

async function buttonSaveUser() {

  if (user.value.surName == "") {
    user.value.surName = null;
  }

  // сбрасываем валидацию

  for (let key in validationData.value) {
    validationData.value[key].splice(0, validationData.value[key].length);
  }

  const validator = new UserDataValidator(user.value);

  const validationResults = new Array<ValidationResult>();

  if (!validator.validate(validationResults)) {
    for (let validationResult of validationResults) {
      validationData.value[validationResult.fieldName].push(validationResult.message);
    }

    return;
  }

  if (isAdd.value) {
    await UsersClient.createUser(user.value as IUserAdd);
  }
  else {
    if (props.id == null) {
      throw Error("Id пользователя не указан");
    }
    await UsersClient.updateUser(parseInt(props.id), user.value as IUserEdit);
  }
  await UsersClient.getUsers(users);
  router.push("/");
}

function cancel() {
  router.push("/");
}
</script>

<template>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-auto col-sm-auto col-auto">
        <div class="card text-bg-light">
          <h6 class="card-header">
            {{ isAdd ? "Добавить пользователя" : "Изменить пользователя" }}
          </h6>
          <form class="card-body" novalidate>
            <div>
              <label for="validationTooltipUsername" class="card-text">Фамилия: </label>
              <input id="validationTooltipUsername" type="text" class="form-control" v-model="user.lastName"
                placeholder="Введите фамилию"
                :class="[{ 'is-invalid': validationData.lastName.length > 0 }, { 'is-valid': user.lastName != null }]">
              <div v-for="validationMessage in validationData.lastName" class="invalid-feedback">
                {{ validationMessage }}
              </div>
              <label for="validationCustom02" class="card-text card-text_margin">Имя: </label>
              <input id="validationCustom02" type="text" class="form-control" v-model="user.firstName"
                placeholder="Введите имя"
                :class="[{ 'is-invalid': validationData.firstName.length > 0 }, { 'is-valid': user.firstName != null }]">
              <div v-for="validationMessage in validationData.firstName" class="invalid-feedback">
                {{ validationMessage }}
              </div>
              <label for="validationCustom03" class="card-text card-text_margin">Отчество: </label>
              <input id="validationCustom03" class="form-control" v-model="user.surName" placeholder="Введите отчество"
                :class="[{ 'is-invalid': validationData.surName.length > 0 }, { 'is-valid': user.surName != null }]">
              <div v-for="validationMessage in validationData.surName" class="invalid-feedback">
                {{ validationMessage }}
              </div>
            </div>

            <div class="card-body__form-group card-body__form-group_col">
              <label for="validationCustom04" class="card-text card-text_margin">Дата рождения: </label>
              <input id="validationCustom04" type="date" class="form-control" v-model="user.birthday"
                :class="[{ 'is-invalid': validationData.birthday.length > 0 }, { 'is-valid': user.birthday != null }]">
              <div v-for="validationMessage in validationData.birthday" class="invalid-feedback">
                {{ validationMessage }}
              </div>
            </div>

            <div class="card-body__button">
              <button type="button" @click="buttonSaveUser" class="btn btn-success">
                Сохранить
              </button>
              <button type="button" @click="cancel" class="btn btn-danger">
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}

.card-text_margin {
  margin-top: 10px;
}

.card-body__button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
