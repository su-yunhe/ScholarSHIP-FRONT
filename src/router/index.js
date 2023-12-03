import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Introduction from '@/views/Introduction/index.vue'
import ScholarView from '../views/scholar/index.vue'
import AcademicView from '../views/academic/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      name: 'introduction',
    },
    {
      path: '/intro',
      name: 'intro',
      component: Introduction
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/scholar',
      name: 'scholar',
      component: ScholarView
    },
    {
      path: '/academic',
      name: 'academic',
      component: AcademicView
    }
  ]
})

export default router