<template>
  <div class="zoo-share content mask" v-show="active" @click="onClose">
    <div class="zoo-share-body " :class="{'up': arrow=='up'}" :style="'top:'+top+'px'" @click.stop="">
      <div class="flex">
        <i class="iconfont icon-share"></i>
        <div class="flex-item col-black">分享到</div>
        <img :src="imgs.qq" @click="onClick('分享到QQ')"/>
        <img :src="imgs.wx" @click="onClick('分享到微信')"/>
        <img :src="imgs.circle" @click="onClick('分享到朋友圈')"/>
      </div>
      <div class="flex" @click="onClick('收藏')">
        <i class="iconfont icon-collect"></i>
        <div class="flex-item col-black">收藏</div>
      </div>
      <div class="flex" @click="onClick('转载照片')">
        <i class="iconfont icon-resend"></i>
        <div class="flex-item col-black">转载照片</div>
      </div>
      <div class="flex" @click="onClick('隐藏此条动态')">
        <i class="iconfont icon-hide"></i>
        <div class="flex-item col-black">隐藏此条动态</div>
      </div>
      <div class="flex" @click="onClick('不看TA的动态')">
        <i class="iconfont icon-watchless"></i>
        <div class="flex-item col-black">不看TA的动态</div>
      </div>
      <div class="flex" @click="onClick('举报好友')">
        <i class="iconfont icon-warning"></i>
        <div class="flex-item col-black">举报</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        active: false,
        arrow: 'down',
        top: 0,
        imgs: {
          qq: require('assets/images/icons/icon-qq.png'),
          wx: require('assets/images/icons/icon-wx.png'),
          circle: require('assets/images/icons/icon-circle.png'),
        },
        callback: ()=>{},
        height: 1.3*window.REM_SIZE*6+10,
        clientH: window.screen.availHeight,
      }
    },
    methods: {
      show(top, height, callback){
        if(top+height+this.height < this.clientH){
          this.top = top+height;
          this.arrow = 'up'
        }else if(top > this.height){
          this.top = top - this.height-height;
          this.arrow = 'down'
        }else if(this.height > this.clientH/2){
          this.top = 0;
          this.arrow = 'down'
        }
        this.active = true;
        this.callback = callback || function(){}
      },
      onClose(){
        this.active = false
      },
      onClick(title){
        this.callback(title+'成功')
        this.onClose();
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .zoo-share{
    .zoo-share-body{
      position: absolute;
      left: 0;
      right: 0;
      background: #f7f7f7;
      animation: scaleIn .3s both;
      &::before{
        position: absolute;
        right: .45rem;
        top: 100%;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-top-color: @colorFFF;
      }
      &.up::before{
        top: auto;
        bottom: 100%;
        border-top-color: transparent;
        border-bottom-color: @colorFFF;
      }
      .flex{
        padding: 0 .4rem;
        height: 1.3rem;
        border-bottom: 1px solid @colorBorder;
        img{
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0 0 0 .2rem @colorFFF;
          margin-right: 1rem;
          opacity: .4;
          &:hover{
            opacity: 1;
          }
        }
        &:last-child{
          border: 0;
        }
      }
      .iconfont{
        font-size: .8rem;
        line-height: .7rem;
        margin-right: .2rem;
      }
    }
  }
</style>
