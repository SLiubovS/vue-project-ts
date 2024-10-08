<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function enter() {
  router.push("/Users");
}

const login = ref();
const password = ref();

const validationMessage = ref<string>("");

if (login.value != 1 || password.value != 1) {
  validationMessage.value = "Даные введены неверно";
}

</script>

<template>

<div class="container">
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
</style>
