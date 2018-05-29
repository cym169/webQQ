<template>
  <div v-title="'更多'" class="dynamic-more has-header container" >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">动态</span>
      </div>
      <div slot="title">更多</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <div class="bar"></div>
        <div class="content">
          <div class="tip">已关闭的功能</div>
        </div>

        <dynamic-item v-for="(item, index) in items" :data="item" @button="onBtnClick(index)"></dynamic-item>

        <div class="bar"></div>
        <dynamic-item :data="{title:'已开启的功能'}" @click="onOpenedClick"></dynamic-item>

      </template>
    </touch-move>

    <toast-msg ref="toastmsg"></toast-msg>
  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import ToastMsg from 'components/ToastMsg';
  import DynamicItem from 'components/dynamic/DynamicItem';

  import { DynamicList } from 'servers/API/dynamic';

  export default {
    components: {
      TouchMove,
      MyHeader,
      Alert,
      ToastMsg,
      DynamicItem,
    },
    props: {},
    data() {
      return {
        items: []
      }
    },
    mounted(){
      DynamicList('more').then(res=>{
        this.items = res;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onBtnClick(index){
        this.$refs.toastmsg.show({
          status: 1,
          title: '已成功开启'+this.items[index].title
        })
        this.items.splice(index, 1)
      },
      onOpenedClick(){
        this.$router.push({
          name: 'dynamic/opened'
        })
      }
    }
  }
</script>

<style lang="less">
</style>
