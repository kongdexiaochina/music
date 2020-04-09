import request from './request'

// 热搜列表数据
export const hotListData = () => request('/search/hot')
