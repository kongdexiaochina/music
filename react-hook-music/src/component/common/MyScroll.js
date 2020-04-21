import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
// 引入BScroll插件
import BScroll from "better-scroll";
function MyScroll (props) {
    // 解构父级传递过来的属性值 content滚动的内容 className对应的类名
    const {content, className, scrollRef} = props
    // BScroll插件的返回值
    const [scroll, setScroll] = useState(null)
    // 滚动的节点
    const wrapper = useRef(null);
    // 实例化BScroll插件
    useEffect(() => {
        const result = new BScroll(wrapper.current, {
            click: true
        })
        setScroll(result);
    }, [])
    // 首先获取到父级标记组件的ref 然后通过useImperativeHandle存储你需要在父级调用的方法
    useImperativeHandle(scrollRef, () => ({
        // changeScroll 就是暴露给父组件的方法 让歌词滚动
        changeScroll: (itemArr, activateIndex) => {
            const item = itemArr[activateIndex]
            if (scroll) {
                // 进行歌词的滚动
                scroll.scrollToElement(item, 200, 0, true)
            }
        }
    }));
    return (
        <div className={className} ref={wrapper}>
            <div className="content">{content}</div>
        </div>
    )
}

export default MyScroll
