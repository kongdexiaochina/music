import React,{Component,createRef} from 'react'
import {getLogin} from '../../../api/index'
import {phoneReg} from '../../../utility/config'
import Prompt from "../../../component/content/Prompt";
export default class MyLogin extends Component {
    constructor(props) {
        super(props);
        // 手机和与密码的ref标记
        this.phoneRef = createRef()
        this.passwordRef = createRef()
    }
    // 登陆
    handleLogin = async () => {
        // 必须是正确的手机号和密码，否则会登陆失败报错
        const phoneValue = this.phoneRef.current.value
        const passwordValue = this.passwordRef.current.value
        if (phoneReg.test(phoneValue) && passwordValue) {
            const result = await getLogin(phoneValue,passwordValue)
            if (result.data.code === 502) {
                this.promptRef.handlePromptToggle()
            } else {
                this.props.handleChangeLogin(result) // 向父级传递参数(登陆的数据)
            }
        } else {
            this.promptRef.handlePromptToggle()
        }
    }
    render() {
        return (
            <>
                <section className={'login'}>
                    <h3 className={'title'}>登陆</h3>
                    <div>
                        <span>手机号</span>
                        <input type="text"  placeholder={'请输入手机号'} ref={this.phoneRef}/>
                    </div>
                    <div>
                        <span>密码</span>
                        <input type="password" placeholder={'请输入密码'} ref={this.passwordRef}/>
                    </div>
                    <button onClick={this.handleLogin}>登陆</button>
                </section>
                <Prompt msg={"登陆失败"} ref={promptRef => this.promptRef = promptRef}/>
            </>
        )
    }
}
