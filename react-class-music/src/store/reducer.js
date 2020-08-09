import {IDLOGIN} from './action-type'

export default function (store = {
    loginStatus: {}
} , action){
    switch (action.type) {
        // 获取用户登陆的状态
        case IDLOGIN :
            return Object.assign({},store,{
                loginStatus: action.data
            })
        default :
            return store
    }
}
