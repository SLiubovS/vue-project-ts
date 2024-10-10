<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UsersClient } from "../api/UsersClient";
import type { IUserAuth } from "../models/IUserAuth";
import type { IUserAuthOK } from "../models/IUserAuthOK";

const router = useRouter();

const user = ref<IUserAuth>({
  login: null,
  password: null
});

const login = ref<string>();
const password = ref<string>();

const token = null;

async function enter(token: string) {

  if (login.value == null || password.value == null) {
  throw Error("Поля логин и пароль должны быть заполнены");
}

user.value.login = login.value;
user.value.password = password.value;

token = await UsersClient.authUser(user.value as IUserAuthOK);
alert(`тип: ${typeof(token)}, значение: ${token})`);

localStorage.setItem("token", `Bearer ${token}`);

if (typeof(token) == 'string') {
  router.push(`/Users/${token}`);
}
else {
  router.push("/");
}

//alert(`тип: ${typeof(token)}, значение: ${token})`);

// localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJleHAiOjE3Mjg1Njg3NDcsImlzcyI6Ik5pZ3RoU29mdCIsImF1ZCI6Ik5pZ3RoU29mdCJ9.-AGuBg54zHTT_CYk5NFshgv5X55TDJ21SbW6CnrC478");

// UsersClient.authUser(user.value as IUserAuthOK, localStorage.getItem("token"));

// router.push("/Users");


// const token = UsersClient.authUser(user.value as IUserAuthOK);

// UsersClient.authUserTokenOK(token);

  // router.push("/Users");
}




</script>

<template>

<div class="container position-relative">
    <div class="row justify-content-center">
      <div class="col-md-auto col-sm-auto col-auto col__margin">
        <div class="card text-bg-light">
          <h4 class="card-header">
            Вход в систему
          </h4>
          <form class="card-body" novalidate>
            <div>
              <div class="row">
                <div class="col-3">
                  <label for="validationTooltipUsername" class="card-text">Логин: </label>
                </div>
                <div class="col-9">
                  <input id="validationTooltipUsername" type="text" class="form-control" v-model="login">
                </div>
              </div>
              <div class="row row__margin">
                <div class="col-3">
                  <label for="validationTooltipUserpassword" class="card-text">Пароль: </label>
                </div>
                <div class="col-9">
                  <input id="validationTooltipUserpassword" type="text" class="form-control" v-model="password">     
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="enter" class="btn btn-primary">Вход</button>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>

.row__margin {
  margin-bottom: 20px;
  margin-top: 20px;
}

.col__margin {
  margin-top: 20%;
}
</style>
