//转换音频时长分/秒显示
export default  function (time) {
    let duration = parseInt(time);
    let minute = parseInt(duration/60) || 0;
    let sec = (duration%60 || 0)+'';
    let isM0 = ':';
    if(minute === 0){
        minute = '00';
    }else if(minute < 10 ){
        minute = '0'+minute;
    }
    if(sec.length === 1){
        sec = '0'+sec;
    }
    return minute+isM0+sec
}
