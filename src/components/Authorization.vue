<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function listUsers() {
  router.push("/Users");
}

</script>

<template>
<button @click="listUsers">Переход на список пользователей</button>
</template>

<style scoped>
</style>
