<script setup lang="ts">

import { ref } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
import { useRouter } from "vue-router";
import { useTableUsStore } from "../tableUs";
import { User } from "../mainUsers/user"

const tableUs = useTableUsStore();
const router = useRouter();

const props = defineProps({
  id: String
})

if (props.id == null) {
    throw Error();
}

const id = parseInt(props.id)
const findedUser = tableUs.usersTable.find(obj => obj.id == id);

if (findedUser == null) {
    throw Error();
}

const user = ref<User>(findedUser);

</script>

<template>
<div> {{ user.id }}</div>
<div> {{ user.lastName }}</div>
<div> {{ user.firstName }}</div>
<div> {{ user.surName }}</div>
<div> {{ user.age }}</div>
<div> {{ user.birthday }}</div>
</template>

<style scoped>

</style>

