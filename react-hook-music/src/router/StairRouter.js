import React, {Suspense} from 'react'
// 引入对应的路由内置的组件
import {Switch, Route, Redirect} from 'react-router-dom'
import ContentLoading from '../component/content/Loading'
// 引入一级路由配置
import {stair} from './config'

function StairRouter () {
    return (
        <Suspense fallback={<ContentLoading />}>
            {/*  一级路由*/}
            <Switch>
                {
                    stair.map((item,index) => {
                        return <Route path={item.path} component={item.component} key={index}/>
                    })
                }
                <Redirect to={"/home"}/>
            </Switch>
        </Suspense>
    )   
}

export default StairRouter;
