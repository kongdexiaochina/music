export default function (time) {
    const date = new Date(time);
    const year = date.getFullYear() + '-';
    const month = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
    const dates = date.getDate() + ' ';
    const hour = date.getHours() + ':';
    const min = date.getMinutes() + ':';
    const second = date.getSeconds();
    return year + month + dates + hour + min + second ;
}
