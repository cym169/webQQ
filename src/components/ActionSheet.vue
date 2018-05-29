<template>
  <div class="actionsheet mask flex" :class="{'active': active}" @click="onItemClick(-1)">
    <div class="actionsheet-btns flex text-center">
      <div class="flex-item tip" @click.stop="" v-if="data.title" v-text="data.title"></div>
      <div class="line" v-if="data.title"></div>
      <template v-for="(item, index) in data.btns" >
        <div class="line" v-if="index != 0"></div>
        <div class="flex-item" v-text="item" @click.stop="onItemClick(index)"></div>
      </template>
      <div class="bar" v-if="data.cancel"></div>
      <div class="flex-item" @click.stop="onItemClick(-1)" v-if="data.cancel">取消</div>
    </div>
  </div>
</template>

<script>
    export default {
      components: {},
      props: {},
      data() {
        return {
          data: {
            btns: ['确定'],
            cancel: true,
            callback: ()=>{},
          },
          active: false,
        }
      },
      methods: {
        show(options){
          options && Object.assign(this.data, options)
          this.active = true;
        },
        onItemClick(index){
          this.data.callback(index);
          this.active = false;
        },
      }
    }
</script>

<style lang="less">
  @import "../assets/less/theme";
  @import "../assets/less/animate";

  .actionsheet{
    display: none;
    opacity: 0;
    animation: fadeIn .3s ease both;
    flex-direction: column;
    justify-content: flex-end;
    .actionsheet-btns{
      width: 100%;
      background: @colorFFF;
      color: @color000;
      animation: moveUp .3s ease both;
      flex-direction: column;
      .line{
        height: 1px;
        width: 100%;
        background: @colorBorder;
      }
      .flex-item{
        width: 100%;
        line-height: 1.4rem;
        transition: background .2s;
        &:hover{
          background: @colorF3
        }
      }
      .bar{
        background: @colorBgPage;
      }
    }
    &.active{
      display: flex;
    }
  }
</style>

