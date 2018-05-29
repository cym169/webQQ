<template>
    <div class="account-item flex content" @click="onAccountClick" :style="style">
      <img :src="data.headimg" />
      <div class="flex-item content text-left text-over" v-text="data.account" ></div>
      <i class="iconfont icon-delete delete" @click.stop="onDeleteClick"></i>
    </div>
</template>

<script>
    export default {
      components: {},
      props: {
        data: Object,
        style: String,
      },
      data() {
        return {}
      },
      methods: {
        onAccountClick(){
          this.$emit('account')
        },
        onDeleteClick(){
          this.$emit('delete')
        }
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .account-item{
    height: 1.6rem;
    background: @colorFFF;
    border-bottom:1px solid @colorBorder;
    animation: scaleIn .2s both;
    img{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
    .icon-delete{
      transform: none;
    }
  }
</style>
