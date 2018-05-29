<template>
  <div class="phone-history-item bg-fff">
    <div class="flex history-date ">
      <div class="content col-black" v-text="data.date"></div>
    </div>

    <div class="flex content history-item" v-for="item in data.list">
      <i class="iconfont icon-arrowld" v-if="item.type=='to'"></i>
      <i class="iconfont icon-arrowru" v-if="item.type=='from'"></i>
      <div class="tip" v-text="item.time"></div>
      <div class="tip" v-text="item.sta"></div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      data: Object
    },
    data() {
      return {}
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .phone-history-item{
    padding-top: .2rem;
    .history-date{
      div{
        font-size: .4rem;
      }
      &::after{
        content:'';
        display: block;
        height: 1px;
        flex: 1;
        background: @colorBorder;
      }
    }
    .history-item{
      justify-content: flex-start;
      padding-top: .1rem;
      padding-bottom: .1rem;
      font-size: .3rem;
      .iconfont{
        margin-left: .3rem;
        margin-right: .2rem;
      }
    }
  }
</style>
