// import { createRouter, createWebHistory } from 'vue-router'
// import UsersView from '../views/UsersView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'UsersView',
//       component: UsersView
//     },
//     {
//       path: '/AddUserView',
//       name: 'AddUserView',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AddUserView.vue')
//     }
//   ]
// })

// export default router


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