<template>
  <div class="tabbar flex text-center">
    <div class="flex-item" :class="{'active':active == index}" v-for="(item, index) in items" @click="onItemClick(index)">
      <i class="iconfont" :class="active == index && item.icon_active ? item.icon_active : item.icon"></i>
      <div v-text="item.title"></div>
      <i class="badge" :class="{'small':item.count==-1}" v-text="item.count" v-if="item.count != 0"></i>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      items: Array,
      active: Number,
    },
    data() {
      return {}
    },
    methods:{
      onItemClick(index){
        this.$emit('click', index)
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";
  .tabbar{
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    height: 2rem;
    background: @colorFFF;
    border-top: 1px solid @colorBorder;
    z-index: 9;
    .iconfont{
      font-size: 1rem;
      line-height: 1rem;
    }
    .flex-item{
      position: relative;
      font-size: .4rem;
      &.active{
        color: @colorSuccess;
      }
      .badge{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate3d(.2rem, 0, 0);
      }
    }
  }
</style>
