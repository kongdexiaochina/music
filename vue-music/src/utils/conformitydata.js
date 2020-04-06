// 我们把许多组件当中的当中的歌曲列表当中的每一项li
// 都给抽离出来形成了一个独立的组件，那么我们向后台请求的数据
// 是不同的那么我们封装函数来处理这些问题
export function ConformityDetailData (list) {
  const newArr = []
  const disposeArr = (item) => {
    newArr.push({
      name: item.name, // 歌曲名字
      song: { // 歌曲简绍
        album: { // 歌曲其他歌手名字
          artists: item.artists || item.ar
        },
        alia: item.alia, // 歌曲副名字
        name: (item.album ? item.album.name : '') || item.al || (item.ar[0] ? item.al[0].name : '') // 歌曲简介名字
      },
      id: item.id // 歌曲ID
    })
  }
  (list || []).forEach(item => {
    disposeArr(item)
  })
  return newArr
}
