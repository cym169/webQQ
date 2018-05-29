<template>
  <div v-title="'新朋友'" class="friend-new container has-header " >
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">联系人</span>
      </div>
      <div slot="title">新朋友</div>
      <div slot="right" class="tab-add">添加</div>
    </my-header>

    <touch-move class="page">
      <template slot="content">
        <div class="content">
          <div class="tip">好友通知</div>
        </div>
        <friend-new-item v-for="(item, index) in requestItems" :data="item"
                         @click="onReqItemClick(index)" @button="onBtnClick(index)"></friend-new-item>
        <router-link class="inline-row tip link-more text-center" tag="div" :to="{name:'friend/newlist'}">
          <div class="item">查看更多</div>
          <i class="item iconfont icon-arrowright"></i>
        </router-link>

        <div class="content">
          <div class="tip">好友推荐</div>
        </div>
        <friend-new-item v-for="(item, index) in recommendItems" :data="item"
                         @click="onRecItemClick(index)" @button="onAddClick(index)"></friend-new-item>

        <div class="to-phone" @click="onPhoneClick">
          <div class="float-fixed content content-v">
            <div class="fl tip">还有{{phoneCount}}位手机通讯录好友也在使用QQ</div>
            <div class="fr">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </div>
          <div class="inline-row">
            <div class="item text-center" v-for="item in phoneItems">
              <img :src="item.headimg" />
              <div class="text-over" v-text="item.title"></div>
            </div>
          </div>
        </div>
        <router-link class="inline-row tip link-more text-center" tag="div" :to="{name:'friend/add' }">
          <div class="item">添加更多好友</div>
          <i class="item iconfont icon-arrowright"></i>
        </router-link>

      </template>
    </touch-move>

    <toast-msg ref="toastmsg"></toast-msg>

    <alert ref="alert"></alert>

    <friend-add ref="friendadd"></friend-add>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import ToastMsg from 'components/ToastMsg';
  import Alert from 'components/Alert';
  import FriendNewItem from 'components/friend/FriendNewItem';
  import FriendAdd from 'components/friend/FriendAdd';

  import { NewFriendList } from 'servers/API/friend';

  export default {
    components: {
      TouchMove,
      MyHeader,
      ToastMsg,
      Alert,
      FriendNewItem,
      FriendAdd,
    },
    props: {},
    data(){
      return {
        requestItems:[],
        recommendItems:[],
        phoneCount: 152,
        phoneItems: [],
      }
    },
    mounted(){
      NewFriendList('request').then(res=>{
        this.requestItems = res;
      })
      NewFriendList('recommend').then(res=>{
        this.recommendItems = res;
      })
      NewFriendList('phone').then(res=>{
        this.phoneCount = res.count;
        this.phoneItems = res.items;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onRightClick(){
        this.$router.push({
          name: 'friend/add'
        })
      },
      onReqItemClick(index){
        this.$router.push({
          name: 'friend/request',
          params: {
            id: this.requestItems[index].id
          }
        })
      },
      onBtnClick(index){
        this.requestItems[index].sta = 0;
        this.$refs.toastmsg.show({
          status: 1,
          title: '通过好友申请'
        })
      },
      onAddClick(index){
        this.$refs.friendadd.show(this.recommendItems[index].id)
      },
      onRecItemClick(index){
        this.$router.push({
          name: 'zoo/other',
          params: {
            id: this.requestItems[index].id
          }
        })
      },
      onPhoneClick(){
        this.$refs.alert.show({
          title: '',
          content: '这里跳转到手机通讯录',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .friend-new{
    .link-more{
      padding: .3rem 0;
      background: @colorFFF;
      border-bottom: 1px solid @colorBorder;
    }
    .to-phone{
      background: @colorFFF;
      border-bottom: 1px solid @colorBorder;
      .inline-row{
        .item{
          width: 2rem;
          padding: .4rem .2rem;
          color: @color000;
          img{
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
