<template>
  <div class="comment">
    <div class="player_bgc" :style="{backgroundImage:`url(${obj.picUrl})`}"></div>
    <div class="top">
      <common-go-back :pathStr="'/player'" :className="'comment_goback'"/>
      <h3 class="title">⭐ 热门评论 ⭐</h3>
    </div>
      <common-my-scroll :className="'comment_wrapper'" v-if="hotComments.length">
        <template #content>
          <ul class="list">
            <li class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="item_img">
                <img :src="item.user.avatarUrl" alt="头像">
              </div>
              <div class="item_wrap">
                <div class="item_header">
                  <div class="item_header_info">
                    <span class="username">{{item.user.nickname}}</span>
                    <span class="time">{{convertDate(item.time)}}</span>
                  </div>
                  <div class="link">
                    <span>{{item.likedCount}}</span>
                    <i>
                      <img src='../../assets/images/like.svg'  alt="">
                    </i>
                  </div>
                </div>
                <div class="item_content">
                  <span v-text="item.content"></span>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </common-my-scroll>
    </div>
</template>

<script>
// 引入对应的API请求函数
import { playerComment } from '../../api/player'
// 引入对应的工具类函数
import { formateDate } from '../../utils/time'
// 引入适用性比较高的组件
import CommonGoBack from '../../components/common/GoBack'
import CommonMyScroll from '../../components/common/MyScroll'
export default {
  name: 'Comment',
  data () {
    return {
      hotComments: [], // 评论数据
      obj: JSON.parse(localStorage.getItem('playerObj'))
    }
  },
  // 请求数据
  created () {
    this.getPlayerComment()
  },
  methods: {
    // 请求数据函数
    async getPlayerComment () {
      const { hotComments } = await playerComment(this.$route.query.id)
      this.hotComments = hotComments
    }
  },
  computed: {
    convertDate () {
      return time => formateDate(time)
    }
  },
  components: {
    CommonGoBack,
    CommonMyScroll
  }
}
</script>

<style scoped lang="scss">
  .comment {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .player_bgc {
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform: scale(1.2);
    transform-origin: center;
    filter: blur(10px);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    animation: bgchange 50s linear infinite;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 42px;
    .title {
      position: absolute;
      width: 95%;
      z-index: 20;
      margin: 3vw 0;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }
  }
    .list {
      .item {
        position: relative;
        padding-top: 10px;
        width: 100%;
        display: flex;
        .item_img {
          height: 35px;
          margin: 0 10px;
          img {
            display: block;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            border: none;
          }
        }
        .item_wrap {
          position: relative;
          padding-right: 10px;
          padding-bottom: 11px;
          flex: 1;
          .item_header {
            display: flex;
            .item_header_info {
              flex: 1;
              display: flex;
              flex-direction: column;
              .username {
                font-size: 14px;
                color: hsla(0, 0%, 100%, .7);
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .time {
                font-size: 9px;
                color: hsla(0, 0%, 100%, .3);
              }
            }
            .link {
              display: inline-block;
              min-width: 30px;
              padding-left: 5px;
              width: 65px;
              height: 22px;
              line-height: 22px;
              font-size: 11px;
              color: #999;
              flex: none;
              text-align: right;
              i {
                display: inline-block;
                width: 14px;
                height: 18px;
                margin-left: 6px;
                line-height: 0;
                vertical-align: middle;
                cursor: pointer;
              }
            }
          }
          .item_content {
            color: #fff;
            position: relative;
            font-size: 15px;
            line-height: 22px;
            margin-top: 5px;
          }
        }
      }
    }
</style>
