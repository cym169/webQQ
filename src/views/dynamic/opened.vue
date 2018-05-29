<template>
  <div v-title="'在动态中显示'" class="dynamic-opened has-header container" >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">更多</span>
      </div>
      <div slot="title">在动态中显示</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <dynamic-item v-for="(item, index) in items" :data="item" @click="onItemClick(index)"></dynamic-item>
      </template>
    </touch-move>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import DynamicItem from 'components/dynamic/DynamicItem';

  import { DynamicList } from 'servers/API/dynamic';

  export default {
    components: {
      TouchMove,
      MyHeader,
      DynamicItem,
    },
    props: {},
    data() {
      return {
        items: []
      }
    },
    mounted(){
      DynamicList('opened').then(res=>{
        this.items = res;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onItemClick(index){
        this.$router.push({
          name: 'dynamic/detail',
          params: this.items[index]
        })
      }
    }
  }
</script>

<style lang="less">

</style>
