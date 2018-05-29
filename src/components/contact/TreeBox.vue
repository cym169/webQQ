<template>
  <div class="tree-box" :class="{'active': active}">
    <div class="tree-box-tab flex" @click="onTabClick">
      <i class="iconfont icon-triangleright" ></i>
      <div class="flex-item" v-text="title"></div>
      <div class="tip" v-text="tip"></div>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      title: String,
      tip: String,
    },
    data() {
      return {
        active: false,
      }
    },
    methods: {
      onTabClick(){
        this.active = !this.active
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .tree-box{
    height: 1.4rem;
    background: @colorFFF;
    overflow: hidden;
    transition: height .3s;
    .tree-box-tab{
      position: relative;
      height: 1.4rem;
      padding: 0 .4rem;
      &::before{
        content: '';
        position: absolute;
        left:0;
        bottom:0;
        height: 1px;
        width: 100%;
        background-color: @colorBorder;
      }
      .icon-triangleright{
        font-size: .3rem;
        color: @color777;
        margin-right: .4rem;
        transition: transform .3s;
      }
    }
    &.active{
      height: auto;
      .icon-triangleright{
        transform: rotate(90deg)
      }
    }
  }
</style>
