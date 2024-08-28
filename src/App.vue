<script setup lang="ts">
import { useTableUsStore } from "./tableUs.js";

const tableUs = useTableUsStore();
</script>

<template>
  <nav class="router">
    <RouterLink to="/" class="router_margin">Users</RouterLink>
    <RouterLink to="/AddUser" class="router_margin">AddUser</RouterLink>
  </nav>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.router {
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
}
</style>
