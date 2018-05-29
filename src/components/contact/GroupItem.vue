<template>
  <div class="group-item flex content bg-fff bottom-border" @click="onItemClick">
    <img :src="data.headimg" />
    <div class="flex-item">
      <span class="col-black" v-text="data.title"></span>
      <span class="tip" v-text="'('+data.count+')'" v-if="data.count"></span>
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
    methods: {
      onItemClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">
  .group-item{
    padding-top: .2rem;
    padding-bottom: .2rem;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: .4rem;
    }
  }
</style>
