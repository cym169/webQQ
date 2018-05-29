<template>
  <div class="cell flex content " @click="onClick">
    <div class="label" v-text="label" v-if="label" :style="longLabel?'width:auto':''"></div>
    <div class="flex-item ">
      <slot name="input"></slot>
    </div>
    <div v-if="unit" v-text="unit"></div>
    <i class="iconfont icon-arrowright" v-if="isLink"></i>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      label:{
        type: String,
        default: '',
      },
      unit:{
        type: String,
        default: '',
      },
      isLink:{
        type: Boolean,
        default: false,
      },
      longLabel:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {}
    },
    methods: {
      onClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";

  .cell{
    min-height: 1.4rem;
    background: @colorFFF;
    border-bottom: 1px solid @colorBorder;
    .label{
      width: 2.5rem;
      color: @color000;
    }
    .flex-item{
      color: @color000;
    }
  }
</style>
