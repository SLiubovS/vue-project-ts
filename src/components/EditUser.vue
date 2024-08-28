<script setup lang="ts">

import { ref,onMounted } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
import { useRouter } from "vue-router";
import { useTableUsStore } from "../tableUs";
import { validationUserInput } from "../helpers/dateHelpers"

const tableUs = useTableUsStore();
const router = useRouter();

const props = defineProps({
  id: String
})

if (props.id == null) {
    throw Error();
}

const id = parseInt(props.id)
const findedUser = tableUs.usersTable.find(obj => obj.id == id);

if (findedUser == null) {
    throw Error();
}

interface IUserEdit {
    id: number;
    lastName: string;
    firstName: string;
    surName: string | null;
    birthday: string;
    age: number;
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

  validationResults.value = validationUserInput(
    user.value.lastName,
    user.value.firstName,
    user.value.surName,
    user.value.birthday,
  );

  if (validationResults.value.length > 0) {
    return validationResults;
  }
  
  tableUs.userEditing(
  user.value.id,
  user.value.firstName,
  user.value.lastName,
  user.value.surName,
  new Date(user.value.birthday));

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
</script>

<template>
<div class="form-edit">
    <div class="form-edit__form-container">
      <div class="form-edit__form-group form-edit__form-group_col">
        <label class="form-edit__label">Фамилия: </label>
        <input
          class="form-edit__input"
          v-model="user.lastName"
          placeholder="Введите фамилию"
          :class="{ 'form-edit__input_color': lastNameInputRed }"
        >
        <span :class="{ 'form-edit__input_color': lastNameInputRed }"></span>
        <label class="form-edit__label">Имя: </label>
        <input
          class="form-edit__input"
          v-model="user.firstName"
          placeholder="Введите имя"
          :class="{ 'form-edit__input_color': firstNameInputRed }"
        />
        <span :class="{ 'form-edit__input_color': firstNameInputRed }"></span>
        <label class="form-edit__label" v-show="checked">Отчество: </label>
        <input
          class="form-edit__input"
          v-show="checked"
          v-model="user.surName"
          placeholder="Введите отчество"
          :class="{ 'form-edit__input_color': surNameInputRed }"
        />
        <span
          v-if="surNameInputRed"
          :class="{ 'form-edit__input_color': surNameInputRed }"
        ></span>
      </div>

      <div class="form-edit__form-group form-edit__form-group_pad">
        <input
          id="formEdit-checkbox"
          class="form-edit__checkbox"
          type="checkbox"
          @change="onClickCheckBox"
          ref="checkbox"
        />
        <label for="formEdit-checkbox">есть отчество? </label>
      </div>

      <div class="form-edit__form-group form-edit__form-group_col">
        <label class="form-edit__label">Дата рождения: </label>
        <input
          type="date"
          class="form-edit__input form-edit__input_margin"
          v-model="user.birthday"
          :class="{ 'form-edit__input_color': birthdayInputRed }"
        />
        
      </div>

      <div class="form-edit__form-group form-edit__form-group_margin">
        <button @click="buttonSaveUser" class="form-edit__button">
          Добавить пользователя
        </button>
      </div>

      <li
        class="form-edit__li_color"
        v-for="validationResult in validationResults"
        :key="validationResult.fieldName"
      >
        {{ validationResult.message }}
      </li>
    </div>
  </div>
</template>

<style scoped>

.form-edit {
  width: 200px;
  border: 1px solid black;
  border-radius: 7px;
  padding: 20px 10px;
  box-shadow: 1px 1px 1px gray;
}

.form-edit__form-group {
  display: flex;
}

.form-edit__form-group_margin {
  margin-bottom: 10px;
}

.form-edit__label {
  margin-bottom: 2px;
}

.form-edit__input {
  margin-top: 0;
}

.form-edit__input_margin {
  margin-bottom: 20px;
}

.form-edit__form-group_col {
  flex-direction: column;
}

.form-edit__form-group_pad {
  padding-bottom: 10px;
}

.form-Edit__button {
  width: 100%;
}

.form-edit__checkbox {
  margin: 0;
  margin-right: 5px;
}

.form-edit__input_color {
  margin-top: 0;
  border-color: red;
  color: red;
}

.form-edit__input_color:focus {
  margin-top: 0;
  outline: none;
  border-color: red;
  color: red;
}

.form-edit__li_color {
  margin-left: 0;
  list-style-type: none;
  color: red;
}
</style> 
