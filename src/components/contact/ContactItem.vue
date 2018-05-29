<template>
  <div class="contact-item " >
    <div class="contact-item-cnt flex content" :style="moveTran">
      <img class="headimg" :class="{'offline':!data.online }" :src="data.headimg" v-if="data.headimg" />
      <i class="headicon text-center iconfont " :class="data.icon" v-if="data.icon"></i>
      <div class="flex-item">
        <div class="title flex">
          <div class="text-over" v-text="data.title"></div>
          <i :class="data.type" v-if="data.type"></i>
        </div>
        <div class="cnt flex-item flex" >
          <div>[{{data.online || '离线'}}]</div>
          <i class="iconfont icon-qqzoo1" v-if="data.zoo"></i>
          <i class="iconfont icon-image" v-if="data.pic"></i>
          <div class="text-over" v-text="data.content"></div>
        </div>
      </div>
      <div class="message-btns flex">
        <div class="item flex" :style="'background: '+(data.spe?'#f74c31':'#f28c48')" @click="onSetClick(data.spe)"><span v-text="data.spe ? '取消特别关心' : '设为特别关心'"></span></div>
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
      onSetClick(){
        this.$emit('setting')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .contact-item{
    border-bottom: 1px solid @colorBorder;
    background: @colorFFF;
    .contact-item-cnt{
      position: relative;
      padding-top: .2rem;
      padding-bottom: .2rem;
      width: 100%;
      transition: transform .2s;
    }
    .headimg{
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      background-color: @colorBBB;
      margin-right: .4rem;
      &.offline{
        opacity: .6;
      }
    }
    .headicon{
      width: 1.1rem;
      height: 1.1rem;
      font-size: .7rem;
      line-height: 1.1rem;
      border-radius: 50%;
      color: @colorFFF;
      background-color: @colorSuccess;
      margin-right: .4rem;
    }
    .title{
      padding: 0;
      text-align: left;
      color: @color000;
      font-size: .47rem;
      justify-content: flex-start;
      i{
        font-family: 'consolas';
        font-size: 12px;
        line-height: 13px;
        font-style: normal;
        padding: 0 5px;
        margin-left: .1rem;
        &.vip{
          color: @colorFFF;
          background: @colorError;
          &::before{
            content: 'VIP';
          }
        }
        &.svip{
          color: @colorError;
          background: #ffff00;
          &::before{
            content: 'SVIP';
          }
        }
      }
    }
    .cnt{
      font-size: .35rem;
      padding-right: .5rem;
      justify-content: flex-start;
      .icon-qqzoo1{
        color: #ffc029;
      }
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
        width: 4rem;
        font-size: .5rem;
        color: @colorFFF;
      }
    }
  }

</style>
