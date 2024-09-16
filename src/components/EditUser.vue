<script setup lang="ts">

import { ref } from "vue";
import type { Ref } from "vue";
import { ValidationResult } from "../validators/ValidationResult";
import { useRouter } from "vue-router";
import { useUsersStore } from "../storages/UseUsersStore";
import type { IUserData } from "../models/IUserData";
import type { IUserEdit } from "../models/IUserEdit"
import { UserDataValidator } from "../validators/UserDataValidator";

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

// сделать результат валидации объектом, у которого полями должны быть названиями lastName, firstName, surName, birthday

const validationData: Ref<{ [key: string]: Array<string>; }> = ref({
  lastName: [],
  firstName: [],
  surName: [],
  birthday: []
});

const user = ref<IUserEdit>({
  id: findedUser.id,
  lastName: findedUser.lastName,
  firstName: findedUser.firstName,
  surName: findedUser.surName,
  birthday: findedUser.birthday.toISOString().split("T")[0], // yyyy-mm-dd
  age: findedUser.age
});

function buttonSaveUser() {

  // сбрасываем валидацию

  for (let key in validationData.value) {
    validationData.value[key].splice(0, validationData.value[key].length);
  }

  const userEdit: IUserData = {
  lastName: user.value.lastName,
  firstName: user.value.firstName,
  surName: user.value.surName,
  birthday: user.value.birthday
  };

  const validator = new UserDataValidator(userEdit);

  const validationResults = new Array<ValidationResult>();

  if (!validator.validate(validationResults)) {
    for (let validationResult of validationResults) {
      validationData.value[validationResult.fieldName].push(validationResult.message);
    }

    return;
  }

  usersStore.update(user.value);

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
    Изменить пользователя
  </h6>
  <form class="card-body" novalidate>
    <div>
        <label for="validationTooltipUsername" class="card-text">Фамилия: </label>
        <input id="validationTooltipUsername" type="text" class="form-control" v-model="user.lastName" placeholder="Введите фамилию"
          :class=" [ {'is-invalid': validationData.lastName.length > 0 } , {'is-valid': user.lastName != null } ]"
          >
        <div v-for="validationMessage in validationData.lastName" class="invalid-feedback">
          {{ validationMessage }}
        </div>
        <label for="validationCustom02" class="card-text card-text_margin">Имя: </label>
        <input id="validationCustom02" type="text" class="form-control" v-model="user.firstName" placeholder="Введите имя"
        :class=" [ {'is-invalid': validationData.firstName.length > 0 } , {'is-valid': user.firstName != null } ]"
        >
        <div v-for="validationMessage in validationData.firstName" class="invalid-feedback">
          {{ validationMessage }}
        </div>
        <label for="validationCustom03" class="card-text card-text_margin">Отчество: </label>
        <input id="validationCustom03" class="form-control" v-model="user.surName" placeholder="Введите отчество"
        :class=" [ {'is-invalid': validationData.surName.length > 0 } , {'is-valid': user.surName != null } ]"
        >
        <div v-for="validationMessage in validationData.surName" class="invalid-feedback">
          {{ validationMessage }}
        </div>
      </div>

      <div class="card-body__form-group card-body__form-group_col">
        <label for="validationCustom04" class="card-text card-text_margin">Дата рождения: </label>
        <input id="validationCustom04" type="date" class="form-control" v-model="user.birthday"
        :class=" [ {'is-invalid': validationData.birthday.length > 0 } , {'is-valid': user.birthday != null } ]"
        >
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
