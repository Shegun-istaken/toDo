import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   component: ()=>import('@/views/LoginNameView.vue')
    // },
    {
      path: '/',
      component: () => import('../views/ToDo.vue')
    }
  ]
})

export default router
