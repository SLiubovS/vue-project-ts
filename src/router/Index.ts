import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../components/Menu.vue';
import Users from '../components/Users.vue';
import EditUser from '../components/EditUser.vue';
import Authorization from '../components/Authorization.vue';

const routes = [
  { path: '/', component: Authorization },
  {
    path: '/Menu', component: Menu,
    children: [
      { path: '/Users', name: 'Users', component: Users },
      { path: '/EditUser', name: 'EditUser', component: EditUser },
      { path: '/EditUser/:id', component: EditUser, props: true }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
