<template>
  <touch-move class="chat-edit-mic" :canVer="false" :isswipe="true" @swipe="onSwipe" @swipemove="onSwipeMove">
    <template slot="content" >
      <div class="edit-mic-cnt text-center">
        <div class="item" :class="{'active': active==0, 'prev':active==1||active==2}" :style="active==0?swipemove:''">
          <div>按住说话</div>
          <i class="iconfont icon-magicwand" :class="{'active': magicActive}" @touchstart="onMagicStart" @touchend="onMagicEnd" @touchcancel="onMagicEnd"></i>
        </div>
        <div class="item" :class="{'active': active==1, 'prev':active==2, 'next':active==0}" :style="active==1?swipemove:''">
          <div>按住说话</div>
          <i class="iconfont icon-mic" :class="{'active': micActive}" @touchstart="onMicStart" @touchend="onMicEnd" @touchcancel="onMicEnd"></i>
        </div>
        <div class="item" :class="{'active': active==2, 'next':active==1||active==0}" :style="active==2?swipemove:''">
          <div v-if="!tomicActive">点击录音</div>
          <div v-if="tomicActive">点击完成</div>
          <i class="iconfont tomic" :class="{'active': tomicActive}" @click="onMicClick"></i>
        </div>
      </div>
      <div class="edit-mic-page text-center">
        <i class="badge small"></i>
        <div :style="activeTran">
          <span :class="{'active':active==0}">变声</span>
          <span :class="{'active':active==1}">对讲</span>
          <span :class="{'active':active==2}">录音</span>
        </div>
      </div>
    </template>
  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';

  export default {
    components: {
      TouchMove,
    },
    props: {},
    data() {
      return {
        active: 1,
        touchmove: 0,
        magicActive: false,
        micActive: false,
        tomicActive: false,
      }
    },
    computed:{
      swipemove(){
        let tran = 'translate3d('+this.touchmove+'px,0,0)';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      },
      activeTran(){
        let tran = 'translate3d('+(1-this.active)*2+'rem,0,0)';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      }
    },
    methods: {
      onSwipe(arrow){
        if(arrow=='cancel'){
          this.touchmove = 0;
        }else if(arrow=='left' && this.active<2){
          this.active++
        }else if(arrow=='right' && this.active>0){
          this.active--
        }
        this.touchmove = 0
      },
      onSwipeMove(move){
        this.touchmove = move
      },
      onMagicStart(){
        this.magicActive = true
      },
      onMagicEnd(){
        this.magicActive = false
        this.$emit('send', {
          type: 'voice',
          message: '一段魔法语音',
        })
      },
      onMicStart(){
        this.micActive = true
      },
      onMicEnd(){
        this.micActive = false
        this.$emit('send', {
          type: 'voice',
          message: '一段普通语音',
        })
      },
      onMicClick(){
        this.tomicActive = !this.tomicActive;
        if(this.tomicActive){
          this.$emit('send', {
            type: 'voice',
            message: '一段录音',
          })
        }
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-edit-mic{
    width: 100%;
    height: 100%;
    .edit-mic-cnt{
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      font-size: 0;
      .item{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        transition: transform .3s;
        &.active{
          transform: translate3d(0, 0, 0);
        }
        &.prev{
          transform: translate3d(-100%, 0, 0);
        }
        &.next{
          transform: translate3d(100%, 0, 0);
        }
        div{
          font-size: .4rem;
          padding: .2rem 0;
        }
        .iconfont{
          display: inline-block;
          width: 2.4rem;
          height: 2.4rem;
          line-height: 2.4rem;
          border-radius: 50%;
          font-size: 1.6rem;
          color: @colorFFF;
          margin: .1rem 0;
          transition: transform .3s, background .3s;
          &.active{
            transform: scale3d(.8, .8, .8);
          }
          &.icon-magicwand{
            background: @colorWorning;
          }
          &.icon-mic{
            background: @colorSuccess;
          }
          &.tomic{
            background: @colorError;
            width: 2rem;
            height: 2rem;
            border: .2rem solid #fff;
            box-shadow: 0 0 0 1px @colorBorder;
            &.active{
              background: @colorSuccess;
            }
          }
        }
      }
    }
    .edit-mic-page{
      position: absolute;
      left: 0;
      right: 0;
      bottom:.3rem;
      overflow: hidden;
      .badge{
        background: @colorSuccess;
      }
      div{
        transition: transform .3s;
      }
      span{
        display: inline-block;
        width: 2rem;
        font-size: .3rem;
        &.active{
          color: @colorSuccess;
        }
      }
    }
  }
</style>
