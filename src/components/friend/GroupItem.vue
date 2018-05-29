<template>
  <div class="group-item flex content bottom-border bg-fff col-black" @click="onItemClick">
    <img class="headimg" :src="data.headimg" />
    <div class="flex-item">
      <div class="flex">
        <div class="flex-item text-over" v-text="data.title"></div>
        <div class="tip" v-text="data.range" v-if="data.range"></div>
      </div>
      <div class="inline-row text-over group-item_tags">
        <div class="item tag" v-if="data.count">
          <i class="iconfont icon-man"></i>
          <span v-text="data.count"></span>
        </div>
        <div class="item tag" v-for="item in data.tags" v-text="item" v-if="data.tags"></div>
      </div>
      <div class="tip text-over" v-text="data.desc"></div>
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

    .headimg{
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: .4rem;
    }
    .group-item_tags{
      font-size: 0;
      .tag{
        background: #61d0f2;
      }
      .tag:nth-child(1){
        background: #8db5ef;
      }
      .tag:nth-child(2){
        background: #ff988a;
      }
      .tag:nth-child(3){
        background: #f8a900;
      }
      .tag:nth-child(4){
        background: #68c34f;
      }
    }
  }
</style>
