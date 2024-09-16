<script setup lang="ts">

</script>

<template>

<nav class="navbar navbar-expand-lg bg-primary sticky-top" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="http://placehold.it/640x70/" alt="Заглушка" width="30" height="24">
    </a>
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav">
      <RouterLink to="/" class="nav-link ">Список пользователей</RouterLink>
      <RouterLink to="/AddUser" class="nav-link">Добавить нового пользователя</RouterLink>
      </div>
    </div>
  </div>
</nav>

  <div class="container">
    <RouterView />
  </div>

</template>

<style scoped>

.router-link-exact-active {
color: white;
}
</style>
