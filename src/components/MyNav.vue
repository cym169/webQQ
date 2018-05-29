<template>
  <div class="my-nav text-center" :class="{'flex':isavg}">
    <div class="item" :class="{'flex-item':isavg}" v-for="(item, index) in items" v-text="item" @click="onItemClick(index)"></div>
    <div class="line" :style="'left: '+lineLeft+'rem;'+(isavg?'width:'+12/this.items.length+'rem':'')"></div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      items: Array,
      isavg: Boolean,
      current: Number,
    },
    data() {
      return {
        active: 0,
      }
    },
    watch: {
      current(){
        this.active = this.current || 0
      }
    },
    computed: {
      lineLeft(){
        let l = (12-this.items.length*3)/2;
        return this.isavg ? 12/this.items.length*this.active : 3*this.active + (l>0 ? l : 0)
      }
    },
    methods: {
      onItemClick(index){
        this.active = index;
        this.$emit('click', index);
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";
  .my-nav{
    position: relative;
    white-space: nowrap;
    overflow: auto;
    width: 100%;
    .item{
      display: inline-block;
      padding: .3rem 0;
      width: 3rem;
    }
    .line{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3rem;
      height: 3px;
      background: @colorSuccess;
      transition: left .3s;
    }
  }
</style>
