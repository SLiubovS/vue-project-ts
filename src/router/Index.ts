import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import EditUser from '../components/EditUser.vue'
import Authorization from '../components/Authorization.vue'

const routes = [
  { path: '/', component: Authorization },
  { path: '/Users', component: Users },
  { path: '/Users/:token', component: Users, props: true },
  { path: '/EditUser', component: EditUser },
  { path: '/EditUser/:id', component: EditUser, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
