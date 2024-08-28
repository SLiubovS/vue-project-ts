<script setup lang="ts">

import { ref } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
import { useRouter } from "vue-router";
import { useTableUsStore } from "../tableUs";
import { validationUserInput } from "../helpers/dateHelpers"

const tableUs = useTableUsStore();
const router = useRouter();

const checked = ref(false);
const lastNameInputRed = ref(false);
const firstNameInputRed = ref(false);
const surNameInputRed = ref(false);
const birthdayInputRed = ref(false);
const validationResults = ref(new Array<ValidationResult>());

interface IUserAdd {
    lastName: string | null;
    firstName: string | null;
    surName: string | null;
    birthday: Date | null | string;
    age: number | null;
}

const user = ref<IUserAdd>({
  lastName: null,
  firstName: null,
  surName: null,
  birthday: null,
  age: null,
});

// function validationUserInput(): Array<ValidationResult> {

//   const validationResults = [];
//   const regexp = /^[А-яЁё]+$/g;
//   const dateBirthday = userAdd.value.birthday;

//   const yearBirthday = new Date(dateBirthday as Date).getFullYear();
//   const todayYear = new Date().getFullYear();

//   if (userAdd.value.lastName == null) {
//     validationResults.push(
//       new ValidationResult("lastName", "Фамилия не заполнена")
//     );
//     lastNameInputRed.value = true;
//   }

//   if (userAdd.value.firstName == null) {
//     validationResults.push(
//       new ValidationResult("firstName", "Имя не заполнено")
//     );
//     firstNameInputRed.value = true;
//   }

//   if (checked.value) {
//     if (userAdd.value.surName == null) {
//       validationResults.push(
//         new ValidationResult("surName", "Отчество не заполнено")
//       );
//       surNameInputRed.value = true;
//     }
//   }

//   if (userAdd.value.birthday == null) {
//     validationResults.push(
//       new ValidationResult("birthday", "Дата рождения не заполнена")
//     );
//     birthdayInputRed.value = true;
//   }

//   if (
//     userAdd.value.lastName != null &&
//     userAdd.value.lastName.match(regexp) == null
//   ) {
//     validationResults.push(
//       new ValidationResult("lastName", "Фамилия содержит нерусские символы")
//     );
//     lastNameInputRed.value = true;
//   }

//   if (
//     userAdd.value.firstName != null &&
//     userAdd.value.firstName.match(regexp) == null
//   ) {
//     validationResults.push(
//       new ValidationResult("firstName", "Имя содержит нерусские символы")
//     );
//     firstNameInputRed.value = true;
//   }

//   if (yearBirthday > todayYear || yearBirthday < 1900) {
//     validationResults.push(
//       new ValidationResult("birthday", "Год рождения заполнен некорректно")
//     );
//     birthdayInputRed.value = true;
//   }

//   if (checked.value) {
//     if (
//       userAdd.value.surName != null &&
//       userAdd.value.surName.match(regexp) == null
//     ) {
//       validationResults.push(
//         new ValidationResult("surName", "Отчество содержит нерусские символы")
//       );
//       surNameInputRed.value = true;
//     }
//   }
//   return validationResults;
// }

function buttonAddUser() {
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

  if(user.value.firstName !== null && user.value.lastName !== null && user.value.birthday != null) {
  tableUs.userCreated(
    user.value.firstName,
    user.value.lastName,
    user.value.surName,
    new Date(user.value.birthday)
  )};

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
  <div class="form-add">
    <div class="form-add__form-container">
      <div class="form-add__form-group form-add__form-group_col">
        <label class="form-add__label">Фамилия: </label>
        <input
          class="form-add__input"
          v-model="user.lastName"
          placeholder="Введите фамилию"
          :class="{ 'form-add__input_color': lastNameInputRed }"
        >
        <span :class="{ 'form-add__input_color': lastNameInputRed }"></span>
        <label class="form-add__label">Имя: </label>
        <input
          class="form-add__input"
          v-model="user.firstName"
          placeholder="Введите имя"
          :class="{ 'form-add__input_color': firstNameInputRed }"
        />
        <span :class="{ 'form-add__input_color': firstNameInputRed }"></span>
        <label class="form-add__label" v-show="checked">Отчество: </label>
        <input
          class="form-add__input"
          v-show="checked"
          v-model="user.surName"
          placeholder="Введите отчество"
          :class="{ 'form-add__input_color': surNameInputRed }"
        />
        <span
          v-if="surNameInputRed"
          :class="{ 'form-add__input_color': surNameInputRed }"
        ></span>
      </div>

      <div class="form-add__form-group form-add__form-group_pad">
        <input
          id="formAdd-checkbox"
          class="form-add__checkbox"
          type="checkbox"
          @change="onClickCheckBox"
        />
        <label for="formAdd-checkbox">есть отчество? </label>
      </div>

      <div class="form-add__form-group form-add__form-group_col">
        <label class="form-add__label">Дата рождения: </label>
        <input
          type="date"
          class="form-add__input form-add__input_margin"
          v-model="user.birthday"
          :class="{ 'form-add__input_color': birthdayInputRed }"
        />
      </div>

      <div class="form-add__form-group form-add__form-group_margin">
        <button @click="buttonAddUser" class="form-add__button">
          Добавить пользователя
        </button>
      </div>

      <li
        class="form-add__li_color"
        v-for="validationResult in validationResults"
        :key="validationResult.fieldName"
      >
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
</style> 