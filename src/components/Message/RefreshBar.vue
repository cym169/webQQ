<template>
  <div class="refresh-bar flex text-center">
    <div class="flex">
      <div class="refresh-icon" :class="{'refresh-success':refreshStep==3}">
        <i class="iconfont " :class="refreshClass"></i>
      </div>
      <div v-text="refreshStepText[refreshStep]"></div>
    </div>
    <div v-text="lastRefresh"></div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      refreshStep: Number,
      lastRefresh: String,
    },
    data() {
      return {
        refreshStepText:['下拉刷新', '释放立即刷新', '正在刷新...', '刷新成功'],
      }
    },
    computed: {
      refreshClass(){
        return this.refreshStep==0 ? 'icon-arrowloading down'
          : this.refreshStep==1 ? 'icon-arrowloading'
            : this.refreshStep==2 ? 'icon-loading'
              : 'icon-success1'
      }
    },
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .refresh-bar{
    position: relative;
    font-size: .35rem;
    height: 2rem;
    width: 100%;
    padding-top: 150%;
    color: @colorFFF;
    background: @colorBlack;
    flex-direction: column;
    .refresh-icon{
      position: absolute;
      left:0;
      bottom: 1rem;
      width: 50%;
      transform: translate3d(0, 50%, 0);
      .iconfont{
        display: inline-block;
      }
      .icon-arrowloading{
        font-size: .8rem;
        color: @color777;
        transition: transform .2s;
        &.down{
          transform: rotate(180deg);
        }
      }
      &.refresh-success{
        position: static;
        width: .6rem;
        font-size: 0;
        transform: none;
      }
    }
  }
</style>
