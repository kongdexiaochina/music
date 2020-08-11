
import React from "react";

const {lazy} = React
// 路由懒加载
const Home = lazy(() => import("../views/Home/Home"))
const Search = lazy(() => import("../views/Search/Search"))
const Recommend = lazy(() => import("../views/Recommend/Recommend"))
const SongSheet = lazy(() => import("../views/SongSheet/SongSheet"))
const Rank = lazy(() => import("../views/Rank/Rank"))
const DJ = lazy(() => import("../views/DJ/DJ"))
const VideoDetails = lazy(() => import("../views/VideoDetails/VideoDetails"))
const Player = lazy(() => import("../views/Player/Player"))
const Discover = lazy(() => import("../views/Discover/Discover"))
const My = lazy(() => import("../views/My/My"))
const Video = lazy(() => import("../views/Video/Video"))

// 一级路由
export const stairRouter = [
    {path: '/home', component: Home},
    {path: '/search', component: Search},
    {path: '/recommend', component: Recommend},
    {path: '/songsheet', component: SongSheet},
    {path: '/rank', component: Rank},
    {path: '/dj', component: DJ},
    {path: '/videoDetails/:id', component: VideoDetails},
    {path: '/player', component: Player}
]

// 二级路由
export const secondRouter = [
    {path: '/', component: Discover, exact: true},
    {path: '/home/discover', component: Discover},
    {path: '/home/my', component: My},
    {path: '/home/video', component: Video}
]
