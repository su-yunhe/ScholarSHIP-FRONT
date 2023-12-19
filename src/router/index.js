import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Introduction from '@/views/Introduction/index.vue'
import ScholarView from '../views/scholar/index.vue'
import AcademicView from '../views/academic/index.vue'
import SearchView from '../views/search/index.vue'
import AnalysesView from '../views/analyses/index.vue'

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
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: () => import('@/views/UserCenter/index.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/analyses',
      name: 'analyses',
      component: AnalysesView
    }
  ]
})

export default router