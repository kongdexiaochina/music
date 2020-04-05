<template>
  <div class="content">
    <slot name="num"></slot>
    <div class="song_paly">
      <h3 class="title">
        {{item.name}}
        <span v-if="item.song.alia">
            <em v-for="(value, key) in item.song.alia" :key="key">
              {{value}}
            </em>
        </span>
      </h3>
      <div class="song_detail">
        <i></i>
        <span v-for="(songName, key) in item.song.album.artists" :key="key">
          {{songName.name}}
        </span>
        <slot name="modifier"></slot>
        {{item.song.name.name || item.song.name}}
      </div>
    </div>
    <div class="song_info">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongListItem',
  // props教验传递过来的数据
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    color: #333;
    .song_paly {
      text-align: left;
      flex: 1 1 auto;
      padding: 6px 0;
      width: 0;
      .title {
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        em {
          color: #888;
        }
      }
      .song_detail {
        font-size: 12px;
        color: #888;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        i {
          display: inline-block;
          width: 12px;
          height: 8px;
          margin-right: 4px;
          background: url('../../assets/images/hot_icon.png') no-repeat;
          background-size: 166px 97px;
        }
      }
    }
    .song_info {
      display: flex;
      padding: 0 10px;
      align-items: center;
      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url('../../assets/images/hot_icon.png') no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;
      }
    }
    &::after {
      width: 300%;
      height: 300%;
      transform: scale(.333333);
      position: absolute;
      z-index: 20;
      content: " ";
      top: 0;
      left: 0;
      pointer-events: none;
      box-sizing: border-box;
      transform-origin: top left;
      border: 0 solid rgba(0,0,0,.1);
      border-bottom-width: 2px;
    }
  }
</style>
