<template>
  <div class="dynamic-item flex content" @click="onItemClick">
    <i class="iconfont" :class="data.icon" v-if="data.icon" :style="'color:'+data.iconcolor"></i>
    <div class="flex-item title" v-text="data.title"></div>
    <i class="iconfont icon-arrowright" v-if="!data.btn"></i>
    <div class="button btn-small btn-border" v-if="data.btn" v-text="data.btn" @click.stop="onBtnClick"></div>
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
      onItemClick(){
        this.$emit('click')
      },
      onBtnClick(){
        this.$emit('button')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .dynamic-item{
    background: @colorFFF;
    border-bottom: 1px solid @colorBorder;
    .iconfont{
      font-size: 1rem;
      line-height: 1rem;
      margin-right: .4rem;
    }
    .title{
      font-size: .55rem;
      padding-right: .4rem;
      text-align: left;
      color: @color000;
    }
    .icon-arrowright{
      font-size: .7rem;
      color: @colorBBB;
      margin-right: 0;
    }
    .btn-small{
      color: @color000;
    }
  }
</style>
