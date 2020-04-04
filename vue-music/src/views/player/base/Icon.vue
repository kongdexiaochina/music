<template>
    <div class="icon">
      <div class="needle"></div>
      <div class="icon_center">
        <div class="icon_center_img">
          <div
            class="icon_center_img_content"
            :style="{animationPlayState: !isOpen ? 'paused' : 'inherit'}">
            <img :src="urlImg" alt="歌曲图片" @click="handleClick(false)">
            <common-frequency :id="id"/>
          </div>
        </div>
      </div>
      <div class="btn" v-show="!isOpen"  @click="handleClick(true)"></div>
    </div>
</template>

<script>
// 引入对应的vuex辅助函数和对应的动作
import { mapState, mapMutations } from 'vuex'
import { isMusic } from '../../../store/actionsType'
// 引入适用性比较高的组件
import CommonFrequency from '../../../components/common/Frequency'
export default {
  name: 'Icon',
  mounted () {
    console.log(this.isOpen)
  },
  computed: {
    ...mapState(['isOpen'])
  },
  methods: {
    ...mapMutations([isMusic]),
    handleClick (bol) {
      this.isMusic(bol)
    }
  },
  // props教验传递过来的数据
  props: {
    urlImg: {
      type: String,
      default: ' '
    },
    id: {
      type: Number,
      default: 0
    }
  },
  components: {
    CommonFrequency
  }
}
</script>

<style scoped lang="scss">
  .icon {
    position: relative;
    margin: 0 auto;
    height: 342px;
    width: 342px;
    .needle {
      position: absolute;
      width: 110px;
      height: 157px;
      top: -80px;
      left: 150px;
      background: url('../../../assets/images/needle_plus.png') no-repeat;
      background-size: contain;
      z-index: 2;
    }
    .icon_center {
      width: 100%;
      height: 100%;
      &::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        background: url('../../../assets/images/disc_plus.png') no-repeat;
        background-size: contain;
      }
      .icon_center_img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 212px;
        height: 212px;
        margin: -106px 0 0 -106px;
        z-index: 1;
        .icon_center_img_content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: url('../../../assets/images/disc_default.png') no-repeat;
          background-size: contain;
          animation: rotate 16s linear infinite;
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(359deg);
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 65px;
      height: 65px;
      background-image: url('../../../assets/images/play_btn.png');
      background-size: contain;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
</style>
