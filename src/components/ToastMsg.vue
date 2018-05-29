<template>
  <div class="toast-msg flex" :class="active?'show':'hide'">
    <i class="iconfont text-center" :class="status == 1 ? 'icon-success' : 'icon-delete'"></i>
    <div class="flex-item title " v-text="title"></div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      data: Object,
    },
    data() {
      return {
        status: 1,
        title: '',
        active: false
      }
    },
    methods: {
      show(option){
        if(!option){return}
        this.status = option.status || 1;
        this.title = option.title || '';
        this.active = true
        setTimeout(()=>{
          this.active = false
        }, 1000)
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";

  .toast-msg{
    position: absolute;
    top:0;
    width: 100%;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.2);
    padding-top: 1rem;
    padding-bottom: .4rem;
    background: @colorFFF;
    z-index: 9999;
    transform: translate3d(0, -100% ,0);
    transition: transform .5s;
    &.show{
      transform: none;
    }
    &.hide{
      transform: translate3d(0, -100% ,0);
    }
    .iconfont{
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
      font-size: .4rem;
      line-height: .65rem;
      margin: 0 .4rem;
      color: @colorFFF;
      &.icon-success{
        background: #89d043;
      }
      &.icon-delete{
        background: #f74c31;
      }
    }
    .title{
      color: @color000;
      padding: 0;
      padding-right: .4rem;
      text-align: left;
    }
  }
</style>
