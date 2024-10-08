<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function exit() {
  const leavePage = confirm("Выйти из системы?");
  if (leavePage) {
    router.push("/");
  }
}
</script>

<template>

<div v-if=" $route.path == '/' " class="container">
  <RouterView />
</div>

<div v-else>
  <nav class="navbar navbar-expand-lg bg-primary sticky-top" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="http://placehold.it/640x70/" alt="Заглушка" width="30" height="24">
      </a>
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class=" navbar-nav collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav justify-content-between align-items-end">
          <div class="navbar-nav align-items-end">
            <RouterLink to="/Users" class="nav-link">Список пользователей</RouterLink>
            <RouterLink to="/EditUser" class="nav-link">Добавить нового пользователя</RouterLink>
          </div>
          <div class="navbar-nav">
            <button class="btn btn-danger" type="submit" @click="exit">Выход из системы</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="container">
    <RouterView />
  </div>
</div>
  

</template>

<style scoped>
.router-link-exact-active {
  color: white;
}

.navbar-collapse {
    align-items: start;
}

.btn-danger {
  margin: 8px 0;
}

.justify-content-between {
  width: 100%;
}
</style>
