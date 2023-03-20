import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main/Main.vue'
import { blogStore } from '../stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Main,
      meta: {
        isShow: true,
        children: false,
        name: '首页',
        disable: true
      }
    },
    {
      path: '/apimanage',
      name: 'apiManage',
      component: () => import('@/views/ApiManage/ApiManage.vue'),
      children: [

      ],
      meta: {
        isShow: true,
        children: true,
        name: '接口管理',
        disable: true
      }
    },
    {
      path: '/blogmanage',
      name: 'blogManage',
      redirect: '/blogmanage/blogview',
      component: () => import('@/views/BlogManage/BlogManage.vue'),
      children: [
        {
          path: 'blogview',
          name: 'blogview',
          component: () => import("@/views/BlogManage/BlogView.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'Odometer',
            name: '仪表盘',
            showFooter: true
          }
        },
        {
          path: 'publishblog',
          name: 'publishBlog',
          component: () => import("@/views/BlogManage/PublishBlog.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'EditPen',
            name: '发布文章',
            showFooter: false
          }
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import("@/views/BlogManage/Blog.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'List',
            name: '管理文章',
            showFooter: true
          }
        },
        {
          path: 'commentmanage',
          name: 'commentManage',
          component: () => import("@/views/BlogManage/CommentManage.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'Comment',
            name: '评论管理',
            showFooter: true
          }
        },
        {
          path: 'classification',
          name: 'classification',
          component: () => import("@/views/BlogManage/Classification.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'Discount',
            name: '分类/标签',
            showFooter: true
          }
        },
        {
          path: 'fileManage',
          name: 'fileManage',
          component: () => import("@/views/BlogManage/FileManage.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'UploadFilled',
            name: '文件管理',
            showFooter: true,
            disable: true
          }
        },
        {
          path: 'chain',
          name: 'chain',
          component: () => import("@/views/BlogManage/Chain.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'Connection',
            name: '友链管理',
            showFooter: true
          }
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import("@/views/BlogManage/Setting.vue"),
          meta: {
            isShow: false,
            isBlogChidren: true,
            icon: 'Setting',
            name: '博客设置',
            showFooter: true,
            disable: true
          }
        },
      ],
      meta: {
        isShow: true,
        children: true,
        name: '博客管理',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    }


    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

router.beforeEach((to, from, next) => {
  const token = blogStore().token
  if (to.path != '/login') {
    if (token && token == '97e5eb1a-2a8f-4f0c-b125-8525454e2431') {
      console.log(111);
      next()
    } else {
      localStorage.removeItem('token')
      next('/login')
    }
  }else{
    if (token && token == '97e5eb1a-2a8f-4f0c-b125-8525454e2431') {
      next('/blogmanage/blogview')
    }else next()
  }
})

export default router