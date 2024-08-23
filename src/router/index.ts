import { createMemoryHistory, createRouter } from 'vue-router'
import Users from '../components/Users.vue'
import AddUser from '../components/AddUser.vue'
import EditUser from '../components/EditUser.vue'

const routes = [
    { path: '/', component: Users },
    { path: '/AddUser', component: AddUser },
    { path: '/EditUser/:id', component: EditUser, props: true }
  ]
  
  const router = createRouter({
    history: createMemoryHistory(),
    routes
  })

  export default router