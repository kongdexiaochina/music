// 引入react-router懒加载插件
import Loadable from "react-loadable";
// 引入路由加载没有出来的组件
import Loading from "./loading/Loading";

// 导出一级路由的配置
export const stair = [
    {
        path: '/home',
        name: 'Home',
        component: Loadable({
            loader: () => import("../views/Home/Home"),
            loading: Loading
        })
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Loadable({
            loader: () => import("../views/Detail/Detail"),
            loading: Loading
        })
    },
    {
        path: '/player/:index',
        name: 'Player',
        component: Loadable({
            loader: () => import("../views/Player/Player"),
            loading: Loading
        })
    },
    {
        path: '/comment/:id',
        name: 'Comment',
        component: Loadable({
            loader: () => import("../views/Comment/Comment"),
            loading: Loading
        })
    }
]
// 导出二级路由的配置
export const second = [
    {
        exact: true,
        path: '/home/recommend',
        name: 'Recommend',
        component: Loadable({
            loader: () => import("../views/Recommend/Recommend"),
            loading: Loading
        })
    },
    {
        path: '/home/songhot',
        name: 'SongHot',
        component: Loadable({
            loader: () => import("../views/SongHot/SongHot"),
            loading: Loading
        })
    },
    {
        path: '/home/search',
        name: 'Search',
        component: Loadable({
            loader: () => import("../views/Search/Search"),
            loading: Loading
        })
    }
]
