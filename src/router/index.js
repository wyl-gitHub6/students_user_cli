import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'Home',
    component:()=>import('../views/Home'),
    children:[
      {
        path:'/index',
        component:()=>import('../views/Index'),
      },
      {
        path: '/checkCourse',
        component:()=>import('../views/CheckCourse')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
