import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home'),
    children: [
      {
        path: '/',
        redirect: '/recommend'
      },
      {
        path: '/recommend',
        name: 'Recommend',
        component: () => import('../views/recommend/Recommend')
      },
      {
        path: '/hotsong',
        name: 'HotSong',
        component: () => import('../views/hotsong/HotSong')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/Search')
      }
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/detail/Detail')
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('../views/player/Player')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/comment/Comment')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
