// 我们把获取到的字符串的形式的歌词转换成数组形式的歌词
export default function lyricParser (lrc) {
    return parseLyric(lrc || '')
}

function parseLyric (lrc) {
    const lyrics = lrc.split('\n')
    const newArr = []
    for (let i=0; i<lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i]);
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        const content = lyric.replace(timeReg, '')
        for (let k=0, h = timeRegExpArr.length; k < h; k++) {
            const t = timeRegExpArr[k]
            const min = Number(String(t.match(/\[\d*/i)).slice(1))
            const sec = Number(String(t.match(/:\d*/i)).slice(1))
            const time = min * 60 + sec
            if (content !== '') {
                newArr.push({
                    time: time,
                    content
                })
            }
        }
    }
    return newArr
}
