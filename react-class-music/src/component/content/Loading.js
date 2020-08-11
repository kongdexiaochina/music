import React from 'react'

// 路由懒加载显示的组件内容
const Loading = () => {
    return (
        <div className={'lds-roller'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading
