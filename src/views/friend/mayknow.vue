<template>
  <div v-title="'可能认识的人'" class="mayknow-page container has-header">
    <myheader @leftClick="onLeftClick" >
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">可能认识的人</div>
    </myheader>

    <touch-move>
      <template slot="content">
        <friend-new-item v-for="(item, index) in items" :data="item" @click="onItemClick(index)" @button="onBtnClick(index)"></friend-new-item>
      </template>
    </touch-move>

    <friend-add ref="friendadd"></friend-add>
  </div>
</template>

<script>
  import Myheader from 'components/MyHeader';
  import TouchMove from 'components/TouchMove';
  import FriendNewItem from 'components/friend/FriendNewItem';
  import FriendAdd from 'components/friend/FriendAdd';

  import { FriendMayKnow } from 'servers/API/friend';

  export default {
    components: {
      Myheader,
      TouchMove,
      FriendNewItem,
      FriendAdd,
    },
    props: {},
    data() {
      return {
        items: []
      }
    },
    mounted(){
      FriendMayKnow('all').then(res=>{
        this.items = res;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onItemClick(index){
        this.$router.push({
          name: 'zoo/other',
          params: {
            id: this.items[index].id
          }
        })
      },
      onBtnClick(index){
        this.$refs.friendadd.show(this.items[index].id)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .mayknow-page{

  }
</style>
