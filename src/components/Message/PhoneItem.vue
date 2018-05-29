<template>
  <div class="phone-item" >
    <div class="phone-item-cnt flex content" :style="moveTran">
      <img class="headimg" :src="data.headimg" />
      <div class="item-cnt flex-item flex" :class="{'not-get':data.status==0}">
        <div class="title" v-text="data.title" v-if="data.title"></div>
        <div class="tip inline-row" v-if="data.time">
          <i class="item iconfont icon-arrowld" v-if="data.type=='to'"></i>
          <i class="item iconfont icon-arrowru" v-if="data.type=='from'"></i>
          <span class="item" v-text="data.time"></span>
        </div>
      </div>
      <i class="cphone iconfont" :class="data.icon" @click.stop="onIconClick"></i>
      <div class="message-btns flex">
        <div class="item flex" style="background: #f74c31;" @click="onDelClick"><span>删除</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      data: Object,
      moveX: Number,
    },
    data() {
      return {}
    },
    computed: {
      moveTran(){
        let tran = 'translate3d('+this.moveX+'px,0,0);';
        return 'transform: '+tran+'-webkit-transform: '+tran;
      }
    },
    methods: {
      onIconClick(){
        this.$emit('phone')
      },
      onDelClick(){
        this.$emit('delete')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .phone-item{
    background: @colorFFF;
    border-bottom: 1px solid @colorBorder;
    overflow: hidden;
    .phone-item-cnt{
      position: relative;
      padding-top: .3rem;
      padding-bottom: .3rem;
      width: 100%;
      transition: transform .2s;
    }
    .headimg{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: @colorBBB;
      margin-right: .4rem;
    }
    .item-cnt{
      flex-direction: column;
      align-items: flex-start;
      .title{
        padding: 0;
        text-align: left;
        color: @color000;
        font-size: .5rem;
      }
      &.not-get{
        .title, .iconfont{
          color: @colorError;
        }
      }
    }
    .icon-phone{
      font-size: .8rem;
      line-height: 1rem;
    }
    .message-btns{
      position: absolute;
      left: 100%;
      top: 0;
      height: 100%;
      font-size: 0;
      white-space: nowrap;
      .item{
        height: 100%;
        width: 2rem;
        font-size: .5rem;
        color: @colorFFF;
      }
    }

  }
</style>
