<template>
  <div class="zoo-msg-item content bg-fff">
    <div class="flex zoo-msg-top content-v">
      <img :src="data.headimg" />
      <div class="flex-item content">
        <div class="col-black" v-text="data.title"></div>
        <div class="tip" v-text="data.date"></div>
      </div>
      <div class="top-arrow">
        <i class="iconfont icon-arrowdown" @click="onShareClick"></i>
      </div>
    </div>
    <div class="zoo-msg-cnt">
      <p class="col-black" v-text="data.message"></p>
      <div class="inline-row">
        <div class="item" v-for="(item, index) in data.imgs" :style="'background-image:url('+item+')'" @click="onImgClick(index)"></div>
      </div>
    </div>
    <div v-if="data.phone">
      <i class="iconfont icon-cellphone"></i>
      <span class="tip" v-text="data.phone"></span>
    </div>
    <div class="zoo-msg-btns flex content-v">
      <div class="flex-item tip">浏览{{data.view}}次</div>
      <i class="iconfont icon-like" :class="{'active': data.liked}" @click="onLikeClick"></i>
      <i class="iconfont icon-message2" @click="onMsgClick"></i>
      <i class="iconfont icon-enter" @click="onEnterClick"></i>
    </div>
    <div class="zoo-msg-likes content-v top-border " v-if="data.likes.length || data.commont.length">
      <div class="inline-row">
        <i class="item iconfont icon-like"></i>
        <span class="item" v-for="(item, index) in data.likes" v-text="index==0 ? item.nickname : '、' + item.nickname"></span>
      </div>
      <div v-for="item in data.commont">
        <span class="col-main" v-text="item.names[0]"></span>
        <span class="col-black" v-if="item.names[1]"> 回复 </span>
        <span v-text="item.names[1]" v-if="item.names[1]"></span>
        <span class="col-black" v-text="': '+item.message"></span>
      </div>
    </div>
    <div class="zoo-msg-edit flex ">
      <div class="flex-item content" @click="onMsgClick">评论</div>
      <i class="iconfont icon-redpacket" @click="onRedClick"></i>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      data: Object,
    },
    data() {
      return {}
    },
    methods: {
      onShareClick($event){
        this.$emit('share', {id: this.data.id, event:$event})
      },
      onImgClick(index){
        this.$emit('imgclick', {
          current: index,
          imgs: this.data.imgs
        })
      },
      onLikeClick(){
        this.$emit('like')
      },
      onMsgClick(){
        this.$emit('commont')
      },
      onEnterClick(){
        this.$emit('send')//转发
      },
      onRedClick(){
        this.$emit('packet')//红包
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .zoo-msg-item{
    margin: .4rem 0;
    padding-bottom: .4rem;
    .zoo-msg-top{
      img{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
      .top-arrow{
        height: 1.6rem;
      }
    }
    .zoo-msg-cnt{
      font-size: 0;
      p{
        font-size: .5rem;
      }
      .item{
        width: 3.5rem;
        height: 3.5rem;
        background-size: cover;
        margin: .1rem;
      }
    }
    .zoo-msg-btns{
      .iconfont{
        font-size: .8rem;
        line-height: .8rem;
        margin-left: 1rem;
        &.active{
          color: @colorSuccess;
        }
      }
    }
    .zoo-msg-edit{
      border: 1px solid @colorBorder;
      color: @colorBBB;
      .iconfont{
        color: @color777;
        font-size: .8rem;
        line-height: .8rem;
      }
    }
    .zoo-msg-likes{
      span{
        color: #295998;
        font-size: .4rem;
      }
      .col-black{
        color: @color000;
      }
      .iconfont{
        display: inline-block;
        font-size: .3rem;
        width: .5rem;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        border-radius: 50%;
        color: @colorFFF;
        background: #295998;
      }
    }
  }
</style>
