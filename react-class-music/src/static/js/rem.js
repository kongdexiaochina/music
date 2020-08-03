(function () {
    change()
    //当切换到不同的设备时 触发change函数
    window.addEventListener('resize',change)
    function change(){
        const html = document.querySelector('html')
        //获取手机设备的宽度值
        const width = window.screen.width;
        //设置html元素的font-size
        // 1rem 37.5px    10rem 375px  375px 和当前设备的屏幕等宽
        // 10rem/750 = x/设计图的尺寸
        html.style.fontSize = width/10+'px'
    }
})()