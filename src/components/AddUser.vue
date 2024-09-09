<script setup lang="ts">

import { ref } from "vue";
import { ValidationResult } from "../models/ValidationResult";
import { useRouter } from "vue-router";
import { useUsersStore } from "../storages/UseUsersStore";
import { validationUserInput } from "../helpers/ValidationHelpers"
import type { IUserValidation } from "../models/IUserValidation";
import type { IUserAdd } from ".../models/IUserAdd"

const usersStore = useUsersStore();
const router = useRouter();

const checked = ref(false);
const lastNameInputRed = ref(false);
const firstNameInputRed = ref(false);
const surNameInputRed = ref(false);
const birthdayInputRed = ref(false);
const validationResults = ref(new Array<ValidationResult>());

const user = ref<IUserAdd>({
  lastName: null,
  firstName: null,
  surName: null,
  birthday: null,
  age: null,
});

function buttonAddUser() {
  surNameInputRed.value = false;
  firstNameInputRed.value = false;
  lastNameInputRed.value = false;
  birthdayInputRed.value = false;
  
  const userAdd: IUserValidation = {
  lastName: user.value.lastName,
  firstName: user.value.firstName,
  surName: user.value.surName,
  birthday: user.value.birthday,
  checked: checked.value,
  };

  validationResults.value = validationUserInput(userAdd);

  if (validationResults.value.length > 0) {
    return validationResults;
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
  <div class="form-add">
    <div class="form-add__form-container">
      <div class="form-add__form-group form-add__form-group_col">
        <label class="form-add__label">Фамилия: </label>
        <input class="form-add__input form-control" v-model="user.lastName" placeholder="Введите фамилию"
          :class="{ 'form-add__input_color': lastNameInputRed }">
        <span :class="{ 'form-add__input_color': lastNameInputRed }"></span>
        <label class="form-add__label">Имя: </label>
        <input class="form-add__input form-control" v-model="user.firstName" placeholder="Введите имя"
          :class="{ 'form-add__input_color': firstNameInputRed }" />
        <span :class="{ 'form-add__input_color': firstNameInputRed }"></span>


        <label class="form-add__label" v-show="checked">Отчество: </label>
        <input class="form-add__input form-control" v-show="checked" v-model="user.surName" placeholder="Введите отчество"
          :class="{ 'form-add__input_color': surNameInputRed }" />
        <span v-if="surNameInputRed" :class="{ 'form-add__input_color': surNameInputRed }"></span>
      </div>

      <div class="form-add__form-group form-add__form-group_pad">
        <input id="formAdd-checkbox" class="form-add__checkbox" type="checkbox" @change="onClickCheckBox" />
        <label for="formAdd-checkbox">есть отчество? </label>
      </div>

      <div class="form-add__form-group form-add__form-group_col">
        <label class="form-add__label">Дата рождения: </label>
        <input type="date" class="form-add__input form-add__input_margin form-control" v-model="user.birthday"
          :class="{ 'form-add__input_color': birthdayInputRed }" />
      </div>

      <div class="form-add__form-group form-add__form-group_padding form-add__form-group_button">
        <button type="button" @click="buttonAddUser" class="btn btn-success">
          <i class="fa-solid fa-user-plus"></i>
        </button>
        <button type="button" @click="cansel" class="btn btn-danger">
          <i class="fa-solid fa-ban"></i>
        </button>
      </div>

      <li class="form-add__li_color" v-for="validationResult in validationResults" :key="validationResult.fieldName">
        {{ validationResult.message }}
      </li>
    </div>
  </div>
</template>

<style scoped>
.form-add {
  width: 200px;
  border: 1px solid black;
  border-radius: 7px;
  padding: 20px 10px;
  box-shadow: 1px 1px 1px gray;
  margin-left: auto;
  margin-right: auto;
}

.form-add__form-group {
  display: flex;
}

.form-add__form-group_margin {
  margin-bottom: 10px;
}

.form-add__label {
  margin-bottom: 2px;
}

.form-add__input {
  margin-top: 0;
}

.form-add__input_margin {
  margin-bottom: 20px;
}

.form-add__form-group_col {
  flex-direction: column;
}

.form-add__form-group_pad {
  padding-bottom: 10px;
}

.form-Add__button {
  width: 100%;
}

.form-add__checkbox {
  margin: 0;
  margin-right: 5px;
}

.form-add__input_color {
  margin-top: 0;
  border-color: red;
  color: red;
}

.form-add__input_color:focus {
  margin-top: 0;
  outline: none;
  border-color: red;
  color: red;
}

.form-add__li_color {
  margin-left: 0;
  list-style-type: none;
  color: red;
}

.form-add__form-group_padding {
  padding-bottom: 0;
}

.form-add__form-group_button {
  display: flex;
  justify-content: space-between;
}
</style>