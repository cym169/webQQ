<template>
  <div class="message-item ">
    <div class="message-item-cnt flex content" :style="moveTran">
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
      <div class="message-btns flex">
        <div class="item flex" style="background: #808080;" @click="onTopClick"><span>置顶</span></div>
        <div class="item flex" style="background: #f28c48; width: 2.5rem" v-if="data.count" @click="onReadClick"><span>标为已读</span></div>
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
      onTopClick(){
        this.$emit('totop')
      },
      onReadClick(){
        this.$emit('read')
      },
      onDelClick(){
        this.$emit('delete')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .message-item{
    border-bottom: 1px solid @colorBorder;
    background: @colorFFF;
    overflow: hidden;
    .message-item-cnt{
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
    .title{
      padding: 0;
      text-align: left;
      color: @color000;
      font-size: .5rem;
    }
    .cnt{
      font-size: .42rem;
      padding-right: .5rem;
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
