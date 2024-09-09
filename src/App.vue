<script setup lang="ts">
</script>

<template>
  <nav class="router p-3 mb-2 bg-secondary-subtle text-emphasis-secondary">
    <div class="router_margin">
    <RouterLink to="/">
      <button type="button" class="btn btn-primary router_button">Список пользователей</button>
    </RouterLink>
    <RouterLink to="/AddUser">
      <button type="button" class="btn btn-primary router_button">Добавить нового пользователя</button>
    </RouterLink>
  </div>
  </nav>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

.router_margin {
  padding-top: 30px;
}

.router_button {
  margin: 10px;
}

.container {
  display: flex;
  align-items: center;
}


/* ниже отключены старые классы */
/* .router {
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: start;
  margin-top: 50px;
  font-size: 25px;
}

.router_margin {
  margin: 20px;
}

.container {
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: start;
  margin-top: 120px;
} */
</style>
