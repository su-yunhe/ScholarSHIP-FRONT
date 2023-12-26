import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Login from '@/views/Login/index.vue'
import Introduction from '@/views/Introduction/index.vue'
import ScholarView from '../views/scholar/scholarPortal.vue'
import PersonalScholarView from '../views/scholar/personalScholar/personalPortal.vue'
import AcademicView from '../views/academic/index.vue'
import SearchView from '../views/search/index.vue'
import AdvancedSearchView from '../views/advancedSearch/index.vue'
import AnalysesView from '../views/analyses/index.vue'
import Institution from '@/views/Institution/index.vue'
import { ElMessage } from 'element-plus'
// 

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

    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: () => import('@/views/AdminLogin/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 未登录
  if (userStore.userInfo.authorization == "") {
    if (to.name == 'admin') {
      next({ name: 'adminLogin' });
      ElMessage({
        message: '请先登录管理端',
        type: 'warning',
      })
    } 
    else if (to.name == 'userCenter') {
      next({ name: 'login' });
      ElMessage({
        message: '请先登录',
        type: 'warning',
      })
    }
    
    else {
      next()
    }
  } 
  // 普通用户
  else if (userStore.userInfo.identity == '用户') {
    if (to.name == 'admin' || to.name == 'adminLogin') {
      next({ ...from, replace: true })
      ElMessage({
        message: '请先登录管理端',
        type: 'warning',
      })
    } 
    else if (to.name == 'login') {
      ElMessage({
        message: '您已登录',
        type: 'warning',
      })
      next({ ...from, replace: true })
    } 
    else {
      next()
    }
  // 管理员
  } else {
    if (to.name == 'admin') {
      next()
    }
    else if (to.name == 'adminLogin') {
      next({ ...from, replace: true })
      ElMessage({
        message: '您已登录管理端',
        type: 'warning',
      })
      
    } else {
      next({ ...from, replace: true })
      ElMessage({
        message: '请先退出管理端',
        type: 'warning',
      })
      
    }
    next()
  }
  // if (!userStore.userInfo.authorization) {
  //   // 将用户重定向到登录页面
  //   next({ name: 'Login' });
  // } else {
  //   next();
  // }
});
export default router

// export default {
//   setup() {
//     const userStore = useUserStore();

//     const router = createRouter({
//       history: createWebHistory(import.meta.env.BASE_URL),
//       // path和component对应关系的位置
//       routes: [
//         {
//           path: '/',
//           redirect: 'intro'
//         },
//         {
//           path: '/intro', 
//           name: 'intro',
//           component: Introduction
//         },
//         {
//           path: '/login',
//           name: 'login',
//           component: Login
//         },
//         {
//           path: '/institution/:essay_id',
//           name: 'institution',
//           component: Institution
//         },
//         {
//           path: '/scholar/:scholar_id',
//           name: 'scholar',
//           component: ScholarView
//         },
//         {
//           path: '/personalScholar',
//           name: 'personalScholar',
//           component: PersonalScholarView
//         },
//         {

//           path: '/academic/:essay_id',
//           name: 'academic',
//           component: AcademicView
//         },
//         {
//           path: '/userCenter',
//           name: 'userCenter',
//           component: () => import('@/views/UserCenter/index.vue')
//         },
//         {
//           path: '/admin',
//           name: 'admin',
//           component: () => import('@/views/Admin/index.vue')
//         },
//         {
//           path: '/search',
//           name: 'search',
//           component: SearchView
//         },
//         {
//           path: '/advancedSearch',
//           name: 'advancedSearch',
//           component: AdvancedSearchView
//         },
//         {
//           path: '/analyses',
//           name: 'analyses',
//           component: AnalysesView

//         },
//         {
//           path: '/adminLogin',
//           name: 'adminLogin',
//           component: () => import('@/views/AdminLogin/index.vue')
//         }
//       ]
//     })

//     router.beforeEach((to, from, next) => {
//       // 未登录
//       if (!userStore.userInfo.authorization == "") {
//         if (to.name == 'admin') {
//           ElMessage({
//             message: '请先登录管理端',
//             type: 'success',
//           })
//           next({ name: 'adminLogin' })
//         } 
//       } else {
//         next()
//       }
//       // if (!userStore.userInfo.authorization) {
//       //   // 将用户重定向到登录页面
//       //   next({ name: 'Login' });
//       // } else {
//       //   next();
//       // }
//     });
//     return router;
//   }
// };
