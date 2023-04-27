import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedInEx } from '../composables/isLoggedIn'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),      meta: {
        isNotLoggedIn: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),      meta: {
        isNotLoggedIn: true
      },
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/ToDo.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLoggedInEx.value) {
      next()
    } else {
      next('/signup')
    }
  } else if (to.matched.some((record) => record.meta.isNotLoggedIn)) {
    if (isLoggedInEx.value) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
