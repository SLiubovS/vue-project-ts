<script setup lang="ts">

import { ref } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
import { useRouter } from "vue-router";
import { useTableUsStore } from "../tableUs";
import { User } from "../mainUsers/user"

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

const user = ref<User>(findedUser);

const checked = ref(false);
const lastNameInputRed = ref(false);
const firstNameInputRed = ref(false);
const surNameInputRed = ref(false);
const birthdayInputRed = ref(false);
const validationResults = ref(new Array<ValidationResult>());

const surName = user.value.surName;

function onExamChack(surName:string | null) {
  if (surName != null && surName != "") {
    checked.value = true;
  
    // тут не хватает запуска события "псевдоклик", не могу понять как выдернуть HTML-элемент 

    }
    return checked; 
  }


onExamChack(surName);



function validationUserInput(): Array<ValidationResult> {

const validationResults = [];
const regexp = /^[А-яЁё]+$/g;
const dateBirthday = user.value.birthday;

const yearBirthday = new Date(dateBirthday as Date).getFullYear();
const todayYear = new Date().getFullYear();

if (user.value.lastName == null) {
  validationResults.push(
    new ValidationResult("lastName", "Фамилия не заполнена")
  );
  lastNameInputRed.value = true;
}

if (user.value.firstName == null) {
  validationResults.push(
    new ValidationResult("firstName", "Имя не заполнено")
  );
  firstNameInputRed.value = true;
}

if (checked.value) {
  if (user.value.surName == null) {
    validationResults.push(
      new ValidationResult("surName", "Отчество не заполнено")
    );
    surNameInputRed.value = true;
  }
}

if (user.value.birthday == null) {
  validationResults.push(
    new ValidationResult("birthday", "Дата рождения не заполнена")
  );
  birthdayInputRed.value = true;
}

if (
  user.value.lastName != null &&
  user.value.lastName.match(regexp) == null
) {
  validationResults.push(
    new ValidationResult("lastName", "Фамилия содержит нерусские символы")
  );
  lastNameInputRed.value = true;
}

if (
  user.value.firstName != null &&
  user.value.firstName.match(regexp) == null
) {
  validationResults.push(
    new ValidationResult("firstName", "Имя содержит нерусские символы")
  );
  firstNameInputRed.value = true;
}

if (yearBirthday > todayYear || yearBirthday < 1900) {
  validationResults.push(
    new ValidationResult("birthday", "Год рождения заполнен некорректно")
  );
  birthdayInputRed.value = true;
}

if (checked.value) {
  if (
    user.value.surName != null &&
    user.value.surName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("surName", "Отчество содержит нерусские символы")
    );
    surNameInputRed.value = true;
  }
}
return validationResults;
}


function buttonSaveUser() {
  surNameInputRed.value = false;
  firstNameInputRed.value = false;
  lastNameInputRed.value = false;
  birthdayInputRed.value = false;

  validationResults.value = validationUserInput();

  if (validationResults.value.length > 0) {
    return validationResults;
  }

  // при нажатии на кнопку сохранить, мы должны:
  // 1. передать все новые поля пользователя id, firstName и т.д.
  // 2. найти в таблице юзеров пользователя с переданным id       + 
  // 3. перезаписать у него все поля, кроме id
  // 4. перейти на главную страницу


  // const editUser = tableUs.usersTable.find(obj => obj.id == user.value.id);
  //const user = ref<User>(findedUser);
  
  // tableUs.userEditing(
  //   user.value.id,
  //   user.value.firstName,
  //   user.value.lastName,
  //   user.value.surName,
  //   new Date(user.value.birthday)
  // );
  console.log(user.value.birthday);


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

// const birthday = ( new Intl.DateTimeFormat("ru").format(user.value.birthday) ) as string;
// const birthdayDate = `${birthday[6]}${birthday[7]}${birthday[8]}${birthday[9]}-${birthday[3]}${birthday[4]}-${birthday[0]}${birthday[1]}`;

</script>

<template>
<!-- <div> {{ user.id }}</div>
<div> {{ user.lastName }}</div>
<div> {{ user.firstName }}</div>
<div> {{ user.surName }}</div>
<div> {{ user.age }}</div> -->
<div> {{ user.birthday }}</div>
<div>{{ new Intl.DateTimeFormat("ru").format(user.birthday) }}</div>



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
        />
        <label for="formEdit-checkbox">есть отчество? </label>
      </div>

      <div class="form-edit__form-group form-edit__form-group_col">
        <label class="form-edit__label">Дата рождения: </label>
        <input
          type="date"
          class="form-edit__input form-edit__input_margin"
          v-model="birthdayDate"
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
