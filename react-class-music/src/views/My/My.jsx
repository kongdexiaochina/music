import React, { Component } from 'react'
import {getLoginStatus} from '../../api/index'
import {connect} from 'react-redux'
import {getIsLogin} from '../../store/action'
import MyLogin from './base/MyLogin'
import MyUserShow from './base/MyUserShow'

class My extends Component {
    // 登陆成功的时候触发
    handleChangeLogin = async (data) => {
        const result = await getLoginStatus()
        const profile = data.data.profile
        this.props.getIsLogin(
            {
                ...result.data.profile,
                follows: profile.follows,
                followeds:profile.followeds,
                playlistCount: profile.playlistCount
            }
        )
    }
    render() {
        const {loginStatus} = this.props
        return (
            <div className="my" style={{minHeight: !Object.keys(loginStatus).length ? '87vh' : '92vh'}}>
                {
                    Object.keys(loginStatus).length ?
                        <MyUserShow userId={loginStatus.userId}/> :
                        <MyLogin handleChangeLogin={this.handleChangeLogin}/>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        loginStatus: state.loginStatus
    }),
    {getIsLogin}
)(My)
