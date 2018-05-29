<template>
  <div class="message-item flex content content-v">
    <img class="headimg" :src="data.headimg" />
    <div class="flex-item">
      <div class="flex">
        <div class="title flex-item text-over" v-text="data.title"></div>
        <div class="tip" v-text="data.time"></div>
      </div>
      <div class="flex">
        <div class="cnt flex-item text-over" v-text="data.content"></div>
        <i class="badge" v-text="data.count" v-if="data.count"></i>
      </div>
    </div>
    <div class="message-btns inline-row" v-if="false">
      <div class="item">置顶</div>
      <div class="item">标为已读</div>
      <div class="item">删除</div>
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
    methods: {}
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .message-item{
    border-bottom: 1px solid @colorBorder;
    transition: background .2s;
    background: @colorFFF;
    &:hover{
      background: @colorF3
    }
    .headimg{
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      background-color: @colorBBB;
      margin-right: .4rem;
      .content{
        padding-right: .4rem;
      }
    }
    .title{
      padding: 0;
      text-align: left;
      color: @color000;
      font-size: .5rem;
    }
    .cnt{
      font-size: .45rem;
      padding-right: .5rem;
    }
  }
</style>
