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
        path: '/map',
        component:()=>import('../views/AddMap')
      },
    ]
  },
  {
    path: '/teacherHome',
    component:()=>import('../views/TeacherHome'),
    redirect: '/teacher',
    children: [
      {
        path: '/teacherMap',
        component:()=>import('../views/AddMap')
      },
      {
        path: '/teacherChat',
        component:()=>import('../views/TeacherChat')
      },
      {
        path: '/score',
        component:()=>import('../views/Score')
      },
      {
        path: '/teacher',
        component:()=>import('../views/Teacher')
      },
      {
        path: '/findClasses',
        component:()=>import('../views/FindClasses')
      },
      {
        path: '/statistical',
        component:()=>import('../views/ScoreStatistical')
      },
      {
        path: '/teacherInfo',
        component:()=>import('../views/TeacherInfo')
      },
    ]
  },
  {
    path: '/studentHome',
    component:()=>import('../views/StudentHome'),
    redirect: '/student',
    children: [
      {
        path: '/studentMap',
        component:()=>import('../views/AddMap')
      },
      {
        path: '/studentChat',
        component:()=>import('../views/StudentChat')
      },
      {
        path: '/checkCourse',
        component:()=>import('../views/CheckCourse')
      },
      {
        path: '/student',
        component:()=>import('../views/Student')
      },
      {
        path: '/findScore',
        component:()=>import('../views/FindScore')
      },
      {
        path: '/studentInfo',
        component:()=>import('../views/StudentInfo')
      },
      {
        path: '/findCourse',
        component:()=>import('../views/FindCourse')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
