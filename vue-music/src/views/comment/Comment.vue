<template>
  <div class="comment">
    <div class="player_bgc" :style="{backgroundImage:`url(${obj.picUrl})`}"></div>
    <div v-if="hotComments.length">
        <div class="top">
        <common-go-back :className="'comment_goback'"/>
        <h3 class="title">⭐ 热门评论 ⭐</h3>
      </div>
      <common-my-scroll :className="'comment_wrapper'" v-if="hotComments.length">
        <template #content>
          <ul class="list">
            <li class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="item_img">
                <img v-lazy="item.user.avatarUrl" alt="头像">
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
    <content-loading v-else/>
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
// 引入适用性不是很高的组件
import ContentLoading from '../../components/content/Loading'
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
    ContentLoading,
    CommonGoBack,
    CommonMyScroll
  }
}
</script>

<style scoped lang="scss">
  $percent: 100%;
  @mixin positionType ($type) {
    position: $type;
  }
  @mixin displayType ($type) {
    display: $type;
  }
  @mixin location ($type) {
    @include positionType($type);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .comment {
    @include positionType(absolute);
    width: $percent;
    height: $percent;
  }
  .player_bgc {
    background-color: #161824;
    background-position: $percent / 2;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform: scale(1.2);
    transform-origin: center;
    filter: blur(10px);
    @include location(absolute);
    height: $percent;
    overflow: hidden;
    z-index: 1;
    animation: bgchange 50s linear infinite;
    &::before {
      content: " ";
      @include location(absolute);
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .top {
    @include location(fixed);
    z-index: 100;
    width: $percent;
    height: 42px;
    .title {
      @include positionType(absolute);
      width: $percent - 5%;
      z-index: 20;
      margin: 3vw 0;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }
  }
    .list {
      .item {
        @include positionType(relative);
        padding-top: 10px;
        width: $percent;
        @include displayType(flex);
        .item_img {
          height: 35px;
          margin: 0 10px;
          img {
            @include displayType(block);
            border-radius: $percent / 2;
            width: 30px;
            height: 30px;
            border: none;
          }
        }
        .item_wrap {
          @include positionType(relative);
          padding-right: 10px;
          padding-bottom: 11px;
          flex: 1;
          .item_header {
            @include displayType(flex);
            .item_header_info {
              flex: 1;
              @include displayType(flex);
              flex-direction: column;
              .username {
                font-size: 14px;
                color: hsla(0, 0%, $percent, .7);
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
              @include displayType(inline-block);
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
                @include displayType(inline-block);
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
            @include positionType(relative);
            font-size: 15px;
            line-height: 22px;
            margin-top: 5px;
          }
        }
      }
    }
</style>
