<template>
  <div class="my-switch" :class="{'active': value}" @click="onSwitch">
    <div></div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {}
    },
    methods: {
      onSwitch(){
        this.$emit('input', !this.value)
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";
  .my-switch{
    position: relative;
    width: 1.2rem;
    height: .6rem;
    border-radius: .3rem;
    border: 1px solid @colorBorder;
    background: @colorFFF;
    transition: background .3s, border .3s;
    div{
      position: absolute;
      left: 0;
      top: -1px;
      width: .6rem;
      height: .6rem;
      border-radius: .3rem;
      border: 1px solid @colorBorder;
      background: @colorFFF;
      transition: left .3s;
    }
    &.active{
      background: @colorOk;
      border-color: @colorOk;
      div{
        left: .6rem;
        transform:translate3d(-2px, 0, 0)
      }
    }
  }
</style>
