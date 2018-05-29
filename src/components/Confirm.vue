<template>
    <div class="confirm mask flex" :class="{'active': active}" @touchmove.stop="">
      <div class="confirm-box flex-item">
        <div class="confirm-cnt text-left">
          <slot name="content"></slot>
        </div>
        <div class="confirm-btns flex text-center" :class="{'much': data.btns.length>2}">
          <template v-for="(item, index) in data.btns" >
            <div class="line" v-if="index != 0"></div>
            <div class="flex-item" v-text="item" @click="onItemClick(index)"></div>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
          return {
            data:{
              btns: ['取消', '确定'],
              callback: ()=>{},
            },
            active: false,
          }
        },
        methods: {
          show(options){
            options && Object.assign(this.data, options);
            this.active = true;
          },
          onItemClick(index){
            this.active = false;
            this.data.callback(index);
          }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/theme";
  @import "../assets/less/animate";

  .confirm{
    display: none;
    opacity: 0;
    animation: fadeIn .3s ease both;
    .confirm-box{
      margin: 0 1rem;
      border-radius: 5px;
      background: @colorFFF;
      color: @color000;
      border-top: 6px solid @colorMain;
      animation: scaleIn .3s ease both;
    }
    &.active{
      display: flex;
    }
    .confirm-cnt{
      padding: .4rem .5rem;
    }
    .confirm-btns{
      border-top: 1px solid @colorBorder;
      line-height: 1.4rem;
      .line{
        width: 1px;
        height: 1.4rem;
        background: @colorBorder;
      }
      .flex-item{
        transition: background .2s;
        &:hover{
          background: @colorF3
        }
      }
      &.much{
        flex-direction: column;
        .flex-item{
          width:100%;
        }
        .line{
          width:100%;
          height: 1px;
        }
      }
    }
  }
</style>

