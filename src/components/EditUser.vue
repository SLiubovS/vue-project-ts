<script setup lang="ts">

import { ref } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
import { useRouter } from "vue-router";
import { useTableUsStore } from "../tableUs.js";

const tableUs = useTableUsStore();
const router = useRouter();


defineProps({
  id: Number
})




</script>

<template>
<div>EditUser {{ id }}</div>
</template>

<style scoped>

</style>

