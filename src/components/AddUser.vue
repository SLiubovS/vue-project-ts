<script setup lang="ts">

import { ref } from "vue";
import type {Ref} from "vue";
import { ValidationResult } from "../validators/ValidationResult";
import { useRouter } from "vue-router";
import { useUsersStore } from "../storages/UseUsersStore";
import type { IUserAdd } from "../models/IUserAdd"
import type { IUserData } from "../models/IUserData";
import { UserDataValidator } from "../validators/UserDataValidator";

const usersStore = useUsersStore();
const router = useRouter();

const checked = ref(false);

// сделать результат валидации объектом, у которого полями должны быть названиями lastName, firstName, surName, birthday

const validationData: Ref<{ [key: string]: Array<string>; }> = ref({
  lastName: [],
  firstName: [],
  surName: [],
  birthday: []
});

const user = ref<IUserAdd>({
  lastName: null,
  firstName: null,
  surName: null,
  birthday: null,
  age: null,
});

function buttonAddUser() {

  // сбрасываем валидацию

  for (let key in validationData.value) {
    validationData.value[key].splice(0, validationData.value[key].length);
  }
  
  const userAdd: IUserData = {
  lastName: user.value.lastName,
  firstName: user.value.firstName,
  surName: user.value.surName,
  birthday: user.value.birthday,
  };

  const validator = new UserDataValidator(userAdd);

  const validationResults = new Array<ValidationResult>();

  if (!validator.validate(validationResults)) {

    for (let validationResult of validationResults) {
      validationData.value[validationResult.fieldName].push(validationResult.message);
    }

    return;
  } 

  usersStore.create(user.value);
  
  router.push("/");
}

function onClickCheckBox(event: Event) {

  if (event.target == null) {
    return;
  }

  checked.value = ((event.target) as HTMLInputElement).checked;

  if (checked.value === false) {
    user.value.surName = null;
  }
}

function cansel() {
  router.push("/");
}
</script>

<template>

<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-auto col-sm-auto col-auto">
<div class="card text-bg-light">
  <h6 class="card-header">
    Новый пользователь
  </h6>
  <div class="card-body">
    <div class="card-body__form-group card-body__form-group_col">
        <label class="card-text">Фамилия: </label>
        <input class="card-body__input card-body__input_margin form-control" v-model="user.lastName" placeholder="Введите фамилию"
          :class="{ 'card-body__input_color': validationData.lastName.length > 0 }">
        <span v-for="validationMessage in validationData.lastName" class="card-body__input_color">
          {{ validationMessage }}
        </span>
        <label class="card-text">Имя: </label>
        <input class="card-body__input card-body__input_margin form-control" v-model="user.firstName" placeholder="Введите имя"
        :class="{ 'card-body__input_color': validationData.firstName.length > 0 }">
        <span v-if="validationData.firstName.length > 0" class="card-body__input_color">{{ validationData.firstName }}</span>


        <label class="card-text" v-show="checked">Отчество: </label>
        <input class="card-body__input card-body__input_margin form-control" v-show="checked" v-model="user.surName" placeholder="Введите отчество"
        :class="{ 'card-body__input_color': validationData.surName.length > 0 }">
        <span v-if="validationData.surName.length > 0" class="card-body__input_color">{{ validationData.surName }}</span>
      </div>

      <div class="card-body__form-group card-body__form-group_pad">
        <input id="formAdd-checkbox" class="card-body__checkbox" type="checkbox" @change="onClickCheckBox" />
        <label for="formAdd-checkbox">есть отчество? </label>
      </div>

      <div class="card-body__form-group card-body__form-group_col">
        <label class="card-text">Дата рождения: </label>
        <input type="date" class="card-body__input card-body__input_margin form-control" v-model="user.birthday"
        :class="{ 'card-body__input_color': validationData.birthday.length > 0 }">
          <span v-if="validationData.birthday.length > 0" class="card-body__input_color">{{ validationData.birthday }}</span>
      </div>

      <div class="card-body__form-group card-body__form-group_button">
        <button type="button" @click="buttonAddUser" class="btn btn-success">
          Сохранить
        </button>
        <button type="button" @click="cansel" class="btn btn-danger">
          Отменить 
        </button>
      </div>
  </div>
</div>
</div>
</div>
</div>
</template>

<style scoped>

.container {
  margin-top: 20px;
}

.card-body__input_margin {
  margin-bottom: 20px;
}

.card-body__form-group_pad {
  padding-bottom: 10px;
}

.card-body__checkbox {
  margin: 0;
  margin-right: 5px;
}

.card-body__input_color {
  margin-top: 0;
  border-color: red;
  color: red;
}

.card-body__input_color:focus {
  margin-top: 0;
  outline: none;
  border-color: red;
  color: red;
}

.card-body__li_color {
  margin-left: 0;
  list-style-type: none;
  color: red;
}

.card-body__form-group_button {
  display: flex;
  justify-content: space-between;
}
</style>