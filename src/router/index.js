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
        path: '/teacherChat',
        component:()=>import('../views/TeacherChat'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/score',
        component:()=>import('../views/Score'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/teacher',
        component:()=>import('../views/Teacher'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/findClasses',
        component:()=>import('../views/FindClasses'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/scoreStatistical',
        component:()=>import('../views/ScoreStatistical'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/creditStatistical',
        component:()=>import('../views/CreditStatistical'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/teacherInfo',
        component:()=>import('../views/TeacherInfo'),
        meta:{
          requireAuth: true
        }
      },
    ]
  },
  {
    path: '/studentHome',
    component:()=>import('../views/StudentHome'),
    redirect: '/student',
    children: [
      {
        path: '/studentChat',
        component:()=>import('../views/StudentChat'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/checkCourse',
        component:()=>import('../views/CheckCourse'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/student',
        component:()=>import('../views/Student'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/findScore',
        component:()=>import('../views/FindScore'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/studentInfo',
        component:()=>import('../views/StudentInfo'),
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/findCourse',
        component:()=>import('../views/FindCourse'),
        meta:{
          requireAuth: true
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem("teacher") || sessionStorage.getItem("student")) {// 判断是否登录
      next()
    } else {// 没登录则跳转到首页
      next({
        path: '/index',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
