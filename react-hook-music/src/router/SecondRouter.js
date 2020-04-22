import React, {Suspense} from 'react'
// 引入对应的路由内置的组件
import {Redirect} from 'react-router-dom'
// 引入路由缓存的组件
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import ContentLoading from '../component/content/Loading'
// 引入二级路由配置
import {second} from './config'
function SecondRouter () {
    return (
        <Suspense fallback = {<ContentLoading />} >
            {/*二级路由*/}
            <CacheSwitch>
                {
                    second.map((item, index) => {
                        if (item.exact) {
                            return (
                                <CacheRoute 
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    key={index}
                                    when="always"
                                    behavior={cached =>
                                    cached
                                        ? {
                                            style: {
                                            position: "absolute",
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: "hidden",
                                            pointerEvents: "none"
                                            },
                                            className: "__CacheRoute__wrapper__cached"
                                        }
                                        : {
                                            className: "__CacheRoute__wrapper__uncached"
                                        }
                                    }
                                />
                            )
                        } else {
                            return (
                                <CacheRoute 
                                    path={item.path}
                                    component={item.component}
                                    key={index}
                                    when="always"
                                    behavior={cached =>
                                    cached
                                        ? {
                                            style: {
                                            position: "absolute",
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: "hidden",
                                            pointerEvents: "none"
                                            },
                                            className: "__CacheRoute__wrapper__cached"
                                        }
                                        : {
                                            className: "__CacheRoute__wrapper__uncached"
                                        }
                                    }
                                />
                            )
                        }
                    })
                }
                <Redirect to={"/home/recommend"}/>
            </CacheSwitch>
        </Suspense>
    )
}

export default SecondRouter
