import React, { Component, Suspense } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import {connect} from 'react-redux'
import {stairRouter} from './router/index'
import SmallPlayer from './component/common/SmallPlayer'
import Loading from './component/content/Loading'


class App extends Component {
  render() {
    const {location,loginStatus} = this.props
    return (
      // 一级路由
      <Suspense fallback={<Loading />}>
        <section style={{paddingBottom: (location.pathname !== '/player' && Object.keys(loginStatus).length)? '41px' : '0'}}>
          <CacheSwitch>
              {
                  stairRouter.map(item => (
                      <CacheRoute
                          key={item.path}
                          path={item.path}
                          component={item.component}
                          // 一些是路由缓存插件的一些配置
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
                          saveScrollPosition={true}
                      />
                  ))
              }
            <Redirect to="/home/discover"/>
          </CacheSwitch>
        </section>
        <SmallPlayer />
      </Suspense>
    );
  }
}

export default withRouter(connect(
    state => ({
      loginStatus: state.loginStatus
    })
)(App));
