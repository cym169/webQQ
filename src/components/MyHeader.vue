<template>
  <div class="myheader content flex" :style="'background:'+bgcol">
    <div class="myheader-btn text-left" @click="onLeftClick">
      <slot name="left"></slot>
    </div>
    <div class="myheader-title flex-item">
      <slot name="title"></slot>
    </div>
    <div class="myheader-btn text-right" @click="onRightClick">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

  export default {
    components:{},
    props:{
      bgcol: String,
    },
    data() {
      return {}
    },
    methods: {
      onLeftClick(){
        this.$emit('leftClick')
      },
      onRightClick(){
        this.$emit('rightClick')
      },
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";
  .myheader{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height: 1.4rem;
    background: @colorMain;
    color: @colorFFF;
    z-index: 99;
    font-size: .5rem;

    .myheader-title{
      text-align: center;
    }
    .myheader-btn{
      min-width: 2rem;
      .iconfont{
        font-size: .6rem;
      }
    }
  }
</style>
