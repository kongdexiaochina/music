<template>
    <header class="header" v-if="Object.keys(songHead).length">
      <div class="header_bgc" :style="{backgroundImage:`url(${songHead.urlImg})`}"></div>
      <common-go-back :pathStr="'/recommend'" :className="'detail_goback'"/>
      <div class="content">
        <div class="content_img">
          <img :src="songHead.urlImg" :alt="songHead.name">
          <span>歌单</span>
        </div>
        <div class="info">
          <h2>{{songHead.name}}</h2>
        </div>
      </div>
    </header>
</template>

<script>
// 引入适用性比较高的组件
import CommonGoBack from '../../../components/common/GoBack'
export default {
  name: 'SongHead',
  // props教验传递过来的数据
  props: {
    songHead: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CommonGoBack
  }
}
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    padding: 5px 10px 24px 15px;
    overflow: hidden;
    .header_bgc {
      position: absolute;
      height: 126px;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(20px);
      transform: scale(1.5);
    }
    .content {
      display: flex;
      position: relative;
      z-index: 2;
      .content_img {
        width: 126px;
        height: 126px;
        position: relative;
        background-color: #e2e2e3;
        img {
          width: 100%;
          vertical-align: middle;
        }
        span {
          position: absolute;
          z-index: 3;
          top: 10px;
          left: 0;
          padding: 0 8px;
          height: 17px;
          color: #fff;
          font-size: 9px;
          text-align: center;
          line-height: 17px;
          background-color: rgba(217,48,48,.8);
          border-top-right-radius: 17px;
          border-bottom-right-radius: 17px;
        }
      }
      .info {
        flex: 1 1 auto;
        width: 1%;
        margin-left: 16px;
        h2 {
          padding-top: 1px;
          font-size: 17px;
          line-height: 1.3;
          color: #fefefe;
          height: 44px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: bolder;
        }
      }
    }
  }
</style>
