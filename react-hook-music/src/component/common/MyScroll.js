import React, {useState, useEffect, useRef} from "react";
// 引入BScroll插件
import BScroll from "better-scroll";
function MyScroll (props) {
    // 解构父级传递过来的属性值 content滚动的内容 className对应的类名
    const {content, className} = props
    // BScroll插件的返回值
    const [scroll, setScroll] = useState(null)
    // 滚动的节点
    const wrapper = useRef(null);
    useEffect(() => {
        const result = new BScroll(wrapper.current, {
            click: true
        })
        setScroll(result);
    }, [])
    console.log(scroll);
    return (
        <div className={className} ref={wrapper}>
            <div className="content">{content}</div>
        </div>
    )
}

export default MyScroll
