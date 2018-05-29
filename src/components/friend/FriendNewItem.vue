<template>
  <div class="friend-new-item flex content content-v" @click="onItemClick">
    <img class="headimg" :src="data.headimg" v-if="data.headimg" />
    <i class="iconfont" :class="data.icon" v-if="data.icon" ></i>
    <div class="flex-item content">
      <div class="col-black text-over" v-text="data.title"></div>
      <div class="flex flex-start">
        <div class="sex" :class="data.sex==1?'male':'female'"  v-if="data.sex || data.age">
          <i class="iconfont" :class="data.sex==1?'icon-male':'icon-female'"></i>
          <span v-text="data.age"></span>
        </div>
        <div class="flex-item tip text-over" v-if="data.tip" v-text="data.tip"></div>
      </div>
      <div class="tip" v-text="'来自：'+data.from" v-if="data.from"></div>
      <div class="tip" v-text="data.signature" v-if="data.signature"></div>
    </div>
    <div class="button btn-small" :class="data.sta == 1 ? 'btn-normal' : data.sta == 2 ? 'btn-success' : 'tip' " v-text="data.btn"
         @click.stop="onBtnClick" v-if="data.sta != -2"></div>
    <i class="iconfont icon-arrowright" v-if="data.sta == -2"></i>
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
        this.data.sta != 0 ? this.$emit('button') : this.$emit('click')
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .friend-new-item{
    padding: .2rem .4rem;
    background: @colorFFF;
    border-bottom: 1px solid @colorBorder;
    .headimg{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
    & > .iconfont{
      font-size: .9rem;
      line-height: 1rem;
      &.icon-arrowright{
        font-size: .6rem;
        color: @colorBBB;
      }
    }
    .title{
      text-align: left;
      color: @color000;
      padding: 0;
      margin-bottom: .1rem;
    }
    .sex{
      font-size: .35rem;
      padding: 0 3px;
      color: @colorFFF;
      margin-right: 5px;
      border-radius: 3px;
      &.male{
        background: @colorSuccess
      }
      &.female{
        background: @colorError;
      }
    }
    .button{
      &.btn-normal::before{
        content: '添加'
      }
      &.btn-success::before{
        content: '同意'
      }
      &.tip::before{
        content: '已忽略'
      }
    }
  }
</style>
