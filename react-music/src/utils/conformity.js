/*
*   该工具类函数，主要是负责整合歌曲列表当中的数据
*       需要整理数组的属性 如下
*           {
*               name:歌曲的名字,
*               song: { 歌曲的简绍 如歌曲的作者和歌曲的详细设计师
*                   artists： 歌曲的设计师,
*                   name: 歌曲的作者
*               },
*               id: 歌曲的id,
*               picUrl: 歌曲图片的路径
*           }
* */
export default function conformityData (arr) {
    const newArr = []
    arr.forEach(item => {
        newArr.push({
            name: item.name,
            song: {
                artists: item.ar || (item.song ? item.song.artists : item.artists),
                name: item.album || (item.al ? item.al.name : '') || item.song.album.name
            },
            id: item.id,
            picUrl: item.artists ? item.artists[0].img1v1Url : '' || item.picUrl || item.al.picUrl
        })
        // console.log();
    })
    return newArr
}
