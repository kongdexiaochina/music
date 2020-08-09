import {IDLOGIN} from './action-type'

// 暴露是否已经登陆的动作
export const getIsLogin = (obj = {}) => ({
    type:IDLOGIN,
    data:obj
})
