import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
// 引入路由缓存组件
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
// 导入二级路由的配置
import {second} from './config'
class SecondRouter extends Component{
    render() {
        return (
            /*二级路由*/
            <CacheSwitch>
                {
                    second.map((item, index) => {
                        if (item.exact) {
                            return <CacheRoute
                                        exact={item.exact}
                                        path={item.path}
                                        component={item.component}
                                        key={index}
                                        when = "always"
                                        behavior = {
                                             cached =>
                                             cached ?
                                             {
                                                 style: {
                                                     position: "absolute",
                                                     zIndex: -9999,
                                                     opacity: 0,
                                                     visibility: "hidden",
                                                     pointerEvents: "none"
                                                 },
                                                 className: "__CacheRoute__wrapper__cached"
                                             } :
                                             {
                                                 className: "__CacheRoute__wrapper__uncached"
                                             }
                                         }
                                    />
                        } else {
                            return <CacheRoute
                                        path={item.path}
                                        component={item.component}
                                        key={index}
                                        when = "always"
                                        behavior = {
                                            cached =>
                                            cached ?
                                            {
                                                style: {
                                                    position: "absolute",
                                                    zIndex: -9999,
                                                    opacity: 0,
                                                    visibility: "hidden",
                                                    pointerEvents: "none"
                                                },
                                                className: "__CacheRoute__wrapper__cached"
                                            } :
                                            {
                                                className: "__CacheRoute__wrapper__uncached"
                                            }
                                        }
                                    />
                        }
                    })
                }
                <Redirect to={"/home/recommend"}/>
            </CacheSwitch>
        )
    }
}

export default SecondRouter
