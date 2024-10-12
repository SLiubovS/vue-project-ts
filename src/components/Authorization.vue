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

async function enter() {

  if (user.value.login == null || user.value.password == null) {
  throw Error("Поля логин и пароль должны быть заполнены");
}

const token = await UsersClient.authUser(user.value as IUserAuthOK);

localStorage.setItem("token", token);
if (token == null) {
  router.push("/");
}
else {
  router.push("/Users");
}
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
                  <input id="validationTooltipUsername" type="text" class="form-control" v-model="user.login">
                </div>
              </div>
              <div class="row row__margin">
                <div class="col-3">
                  <label for="validationTooltipUserpassword" class="card-text">Пароль: </label>
                </div>
                <div class="col-9">
                  <input id="validationTooltipUserpassword" type="text" class="form-control" v-model="user.password">     
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
