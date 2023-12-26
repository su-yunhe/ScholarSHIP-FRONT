import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Introduction from '@/views/Introduction/index.vue'
import ScholarView from '../views/scholar/scholarPortal.vue'
import PersonalScholarView from '../views/scholar/personalScholar/personalPortal.vue'
import AcademicView from '../views/academic/index.vue'
import SearchView from '../views/search/index.vue'
import AdvancedSearchView from '../views/advancedSearch/index.vue'
import AnalysesView from '../views/analyses/index.vue'
import Institution from '@/views/Institution/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      redirect: 'intro'
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
      path: '/institution/:essay_id',
      name: 'institution',
      component: Institution
    },
    {
      path: '/scholar/:scholar_id',
      name: 'scholar',
      component: ScholarView
    },
    {
      path: '/personalScholar',
      name: 'personalScholar',
      component: PersonalScholarView
    },
    {

      path: '/academic/:essay_id',
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
      path: '/advancedSearch',
      name: 'advancedSearch',
      component: AdvancedSearchView
    },
    {
      path: '/analyses',
      name: 'analyses',
      component: AnalysesView

    }
  ]
})

export default router