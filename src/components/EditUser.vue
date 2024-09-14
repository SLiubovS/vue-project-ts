<script setup lang="ts">

import { ref, onMounted } from "vue";
import { ValidationResult } from "../validators/ValidationResult";
import { useRouter } from "vue-router";
import { useUsersStore } from "../storages/UseUsersStore";
import { validationUserInput } from "../helpers/ValidationHelpers";
import type { IUserValidation } from "../models/IUserValidation";
import type { IUserEdit } from "../models/IUserEdit"

const usersStore = useUsersStore();
const router = useRouter();

const props = defineProps({
  id: String
})

if (props.id == null) {
  throw Error();
}

const id = parseInt(props.id);
const findedUser = usersStore.users.find(obj => obj.id == id);

if (findedUser == null) {
  throw Error();
}

const user = ref<IUserEdit>({
  id: findedUser.id,
  lastName: findedUser.lastName,
  firstName: findedUser.firstName,
  surName: findedUser.surName,
  birthday: findedUser.birthday.toISOString().split("T")[0], // yyyy-mm-dd
  age: findedUser.age
});

const checked = ref(false);
const lastNameInputRed = ref(false);
const firstNameInputRed = ref(false);
const surNameInputRed = ref(false);
const birthdayInputRed = ref(false);
const validationResults = ref(new Array<ValidationResult>());
const checkbox = ref<HTMLInputElement | null>(null);

function onExamChack(): void {
  if (user.value.surName != null && user.value.surName != "") {
    checked.value = true;
  }
}

onExamChack();

onMounted(() => {
  if (checked.value) {

    if (checkbox.value != null) {
      checkbox.value.checked = true;
    }
  }
});

function buttonSaveUser() {
  surNameInputRed.value = false;
  firstNameInputRed.value = false;
  lastNameInputRed.value = false;
  birthdayInputRed.value = false;

  const userEdit: IUserValidation = {
  lastName: user.value.lastName,
  firstName: user.value.firstName,
  surName: user.value.surName,
  birthday: user.value.birthday,
  checked: checked.value,
  };

  validationResults.value = validationUserInput(userEdit);

  if (validationResults.value.length > 0) {
    return validationResults;
  }

  usersStore.update(user.value);

  router.push("/");
}

function onClickCheckBox(event: Event) {

  if (event.target == null) {
    return;
  }

  checked.value = ((event.target) as HTMLInputElement).checked;

  if (checked.value === false) {
    user.value.surName = "";
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
    Изменить пользователя
  </h6>
  <div class="card-body">
    <div class="card-body__form-group card-body__form-group_col">
        <label class="card-text">Фамилия: </label>
        <input class="card-body__input card-body__input_margin form-control" v-model="user.lastName" placeholder="Введите фамилию"
          :class="{ 'card-body__input_color': lastNameInputRed }">
        <span :class="{ 'card-body__input_color': lastNameInputRed }"></span>
        <label class="card-text">Имя: </label>
        <input class="card-body__input card-body__input_margin form-control" v-model="user.firstName" placeholder="Введите имя"
          :class="{ 'card-body__input_color': firstNameInputRed }" />
        <span :class="{ 'card-body__input_color': firstNameInputRed }"></span>


        <label class="card-text" v-show="checked">Отчество: </label>
        <input class="card-body__input card-body__input_margin form-control" v-show="checked" v-model="user.surName" placeholder="Введите отчество"
          :class="{ 'card-body__input_color': surNameInputRed }" />
        <span v-if="surNameInputRed" :class="{ 'card-body__input_color': surNameInputRed }"></span>
      </div>

      <div class="card-body__form-group card-body__form-group_pad">
        <input id="formEdit-checkbox" class="card-body__checkbox" type="checkbox" @change="onClickCheckBox" ref="checkbox"/>
        <label for="formEdit-checkbox">есть отчество? </label>
      </div>

      <div class="card-body__form-group card-body__form-group_col">
        <label class="card-text">Дата рождения: </label>
        <input type="date" class="card-body__input card-body__input_margin form-control" v-model="user.birthday"
          :class="{ 'card-body__input_color': birthdayInputRed }" />
      </div>

      <div class="card-body__form-group card-body__form-group_button">
        <button type="button" @click="buttonSaveUser" class="btn btn-success">
          Сохранить
        </button>
        <button type="button" @click="cansel" class="btn btn-danger">
          Отменить 
        </button>
      </div>

      <li class="card-body__li_color" v-for="validationResult in validationResults" :key="validationResult.fieldName">
        {{ validationResult.message }}
      </li>
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
