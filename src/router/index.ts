import { createMemoryHistory, createRouter } from 'vue-router'
import Users from '../components/Users.vue'
import AddUser from '../components/AddUser.vue'

const routes = [
    { path: '/', component: Users },
    { path: '/AddUser', component: AddUser }
  ]
  
  const router = createRouter({
    history: createMemoryHistory(),
    routes
  })

  export default router