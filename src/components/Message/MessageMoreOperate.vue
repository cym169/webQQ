<template>
  <div class="home-more-operate mask" v-show="delayActive" @click="onMaskClick">
    <div class="operate-box" :class="active ? 'show' : 'hide'">
      <div v-for="item in items" class="operate-item inline-row" @click="onItemClick(item.title)">
        <i class="item iconfont " :class="item.icon"></i>
        <div class="item" v-text="item.title"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      items: Array,
    },
    data() {
      return {
        delayActive: false,
        active: false,
      }
    },
    methods: {
      show(){
        this.delayActive = true;
        this.active = true;
      },
      onMaskClick(){
        this.active = false;
        setTimeout(()=>{
          this.delayActive = false;
        }, 300);
      },
      onItemClick(title){
        this.$emit('alert', {
          title: '',
          content: '此处跳转到"'+title+'"业务模块',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .home-more-operate{
    &.show{
      animation: fadeIn .3s both;
    }
    &.hide{
      animation: fadeOut .3s both;
    }
    .operate-box{
      position: absolute;
      top: 1.6rem;
      right: .2rem;
      border-radius: 5px;
      min-width: 4rem;
      background: @colorFFF;
      transform-origin: 90% 0;
      &.show{
        animation: scaleIn .3s both;
      }
      &.hide{
        animation: scaleOut .3s both;
      }
      &::before{
        content:'';
        display: block;
        position: absolute;
        top: -.5rem;
        right: .3rem;
        width:0;
        height: 0;
        border: .3rem solid transparent;
        border-bottom-color: @colorFFF;
      }
    }
    .operate-item{
      font-size: .45rem;
      color: @color000;
      padding: .2rem .3rem;
      transition: background .2s;
      &:hover{
        background: @colorF3
      }
      .iconfont{
        font-size: .65rem;
        margin-right: .2rem;
      }
    }
  }
</style>
