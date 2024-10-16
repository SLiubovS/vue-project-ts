<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UsersClient } from "../api/UsersClient";
import type { IUserAuth } from "../models/IUserAuth";
import type { IUserAuthOK } from "../models/IUserAuthOK";
import axios from "axios";

const router = useRouter();

const user = ref<IUserAuth>({
  login: null,
  password: null
});

const auth = ref<boolean>(false);
const authMessege = ref<string>("");

function login(): void {

  if (user.value.login == null || user.value.password == null) {
    throw Error("Поля логин и пароль должны быть заполнены");
  }
  user.value as IUserAuthOK;

  UsersClient.authUser(user.value.login, user.value.password)
  .then(response => {
    const token = response.data as string;
      localStorage.setItem("token", token);
      router.push("/Users");
    });
  // .catch(function (error) {
  //   console.log(error);
  // });

    }
  



  // UsersClient.authUser(user.value as IUserAuthOK)
  // .then(response => {

  //   if (response.ok) {
  //     response.text().then(token => {
  //     localStorage.setItem("token", token);
  //     router.push("/Users");
  //   });
  //   } else {
  //     auth.value = true;
  //     authMessege.value = "Неверно введен логин или пароль";
  //   }
  // });
// }
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
                  <input id="validationTooltipUsername" type="text" class="form-control" v-model="user.login"
                  :class="[{ 'is-invalid': auth == true }]"
                  > 
                </div>
              </div>
              <div class="row row__margin">
                <div class="col-3">
                  <label for="validationTooltipUserpassword" class="card-text">Пароль: </label>
                </div>
                <div class="col-9">
                  <input id="validationTooltipUserpassword" type="text" class="form-control" v-model="user.password"
                  :class="[{ 'is-invalid': auth == true }]"
                  >
                  <div v-if="auth == true" class="invalid-feedback">
                {{ authMessege }}
              </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" @click="login" class="btn btn-primary">Вход</button>
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
