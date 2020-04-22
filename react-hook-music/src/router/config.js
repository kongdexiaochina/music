// 路由懒加载
import {lazy} from 'react'
// 一级路由
const Home = lazy(() => import('../views/Home/Home'));
const Detail = lazy(() => import("../views/Detail/Detail"))
const Player = lazy(() => import("../views/Player/Player"))
const Comment = lazy(() => import("../views/Comment/Comment"))
// 二级路由
const Recommend = lazy(() => import('../views/Recommend/Recommend'))
const HotSong = lazy(() => import('../views/HotSong/HotSong'))
const Search = lazy(() => import('../views/Search/Search'))
// 导出一级路由的配置
export const stair = [{
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/player',
        name: 'Player',
        component: Player
    },
    {
        path: '/comment',
        name: 'Comment',
        component: Comment
    }
]
// 导出二级路由的配置
export const second = [
    {
        exact: true,
        path: '/home/recommend',
        name: 'Recommend',
        component: Recommend
    },
    {
        path: '/home/hotsong',
        name: 'SongHot',
        component: HotSong
    },
    {
        path: '/home/search',
        name: 'Search',
        component: Search
    }
]