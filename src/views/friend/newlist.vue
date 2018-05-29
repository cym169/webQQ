<template>
  <div v-title="'好友通知'" class="friend-newlist container has-header " >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">好友通知</div>
    </my-header>

    <touch-move class="page">
      <template slot="content">
        <friend-new-item v-for="(item, index) in items" :data="item"
                         @click="onReqItemClick(index)" @button="onBtnClick(index)"></friend-new-item>
      </template>
    </touch-move>

    <toast-msg ref="toastmsg"></toast-msg>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import ToastMsg from 'components/ToastMsg';
  import Alert from 'components/Alert';
  import FriendNewItem from 'components/friend/FriendNewItem';

  import { NewFriendList } from 'servers/API/friend';

  export default {
    components: {
      TouchMove,
      MyHeader,
      ToastMsg,
      Alert,
      FriendNewItem,
    },
    props: {},
    data(){
      return {
        items:[],
      }
    },
    mounted(){
      NewFriendList('all').then(res=>{
        this.items = res;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onReqItemClick(index){
        this.$router.push({
          name: 'friend/request',
          params: {
            id: this.items[index].id
          }
        })
      },
      onBtnClick(index){
        this.items[index].sta = 0;
        this.$refs.toastmsg.show({
          status: 1,
          title: '通过好友申请'
        })
      },
    }
  }
</script>

<style lang="less">

</style>
