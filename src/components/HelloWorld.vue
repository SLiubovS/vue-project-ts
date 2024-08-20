<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1>откуда это сообщение{{ msg }} ?</h1>
    
  </div>
</template>

<style scoped>

</style>
