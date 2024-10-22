<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

function exit() {
  const leavePage = confirm('Выйти из системы?');
  if (leavePage) {
    localStorage.removeItem('token');
    router.push('/');
  }
}
</script>

<template>

    <div>
        <nav class="navbar navbar-expand-lg bg-primary sticky-top" data-bs-theme="dark">
            <div class="container-fluid justify-content-center">
                <a class="navbar-brand table_align" href="#">
                    <img src="/src/img/icons_lable.png" alt="Логотип" width="40" height="40">                    
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Переключатель навигации">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class=" navbar-nav collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav justify-content-between align-items-end">
                        <div class="navbar-nav align-items-end">
                            <RouterLink to="/Users" class="nav-link">Список пользователей</RouterLink>
                            <RouterLink to="/EditUser" class="nav-link">Добавить нового пользователя</RouterLink>
                        </div>
                        <div class="navbar-nav">
                          <div class="nav-link" @click="exit" role="button">Выход</div>
      
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <RouterView></RouterView>
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

.table_align {
  margin: 0;
  padding: 5px;
}
</style>