// 动画函数，可以改变CSS数值属性的CSS样式 如opacity
export default function animation(dom,target,time,callBack){
    /*
       dom是oBox元素；
       attr是width值
       target是要变化到的值
       times是变化的时间n秒
    */

    //遍历对象 attr是对象的属性名
    var start = {};//存放dom样式的初始值
    var speed = {};//存放dom样式的速度
    for(var attr in target){
         start[attr] = parseFloat(getStyle(dom,attr));
         speed[attr] = (target[attr] - start[attr])/(time*1000);
    }
    var startTime = new Date();//获取dom运动的初始时间
    var timer = setInterval(function(){
        //回调函数的作用是让dom元素运动
        var movedTime  = new Date();//获取最新时间、
        var _t = movedTime - startTime;//计算dom元素运动的时间差 单位是ms
        for(let attr in target){
            if (attr==='opacity') {
                dom.style[attr] = start[attr]+speed[attr]*_t;
            }else {
                dom.style[attr] = start[attr]+speed[attr]*_t+"px";
            }
        }
        //如果dom运动的时间差值大于 指定的时间time 那就清除掉定时器clearInterval(timer);
      if(_t/1000>=time){
        clearInterval(timer);
        for(let attr in target){
            if(attr==='opacity'){
                dom.style[attr] = target[attr];
            }else{
                dom.style[attr] = target[attr]+'px';
            }
        };
        //当运动到终点值的时候  执行回调函数
        callBack&&callBack.call(dom,start,time);
    }

    },16)
    //获取元素的初始值
    function getStyle(dom,attr){
        if (dom.currentStyle) {
            return dom.currentStyle;
        }else {
            return window.getComputedStyle(dom,null)[attr];
        }
    }
}
