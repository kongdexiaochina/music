import request from './request'

// 热搜列表数据
export const hotListData = () => request('/search/hot')

// 热门搜索数据 name是搜索数据的关键词 如海阔天空
export const hotSearch = name => request(`/search?keywords=${name}`)
