// 我们把许多组件当中的当中的歌曲列表当中的每一项li
// 都给抽离出来形成了一个独立的组件，那么我们向后台请求的数据
// 是不同的那么我们封装函数来处理这些问题
export function ConformityDetailData (list) {
  const newArr = []
  const disposeArr = (item) => {
    newArr.push({
      name: item.name,
      song: {
        album: {
          artists: item.ar
        },
        alia: item.alia,
        name: item.al || item.ar[0].name
      }
    })
  }
  list.forEach(item => {
    disposeArr(item)
  })
  return newArr
}
