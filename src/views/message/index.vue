<template>
  <div v-title="'消息'" class="message-page container has-header has-tabbar" >
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick">
      <div slot="left" class="tab-headimg" >
        <img :src="getUserinfo.headimg" />
        <i class="badge small" v-if="getUserinfo.isnew"></i>
      </div>
      <div slot="title" class="tab-btn inline-row text-center">
        <i class="icon-loading" v-show="isLoadingMessage"></i>
        <router-link class="item" :to="{path:'./msgs'}" tag="div">消息</router-link>
        <router-link class="item" :to="{path:'./phone'}" tag="div">电话</router-link>
      </div>
      <div slot="right" class="tab-add" >
        <i class="iconfont icon-add"></i>
      </div>
    </my-header>

    <router-view @alert="onAlert" @loaded="onLoaded" @homemove="onHomeMove" @homeswipe="onHomeSwipe"></router-view>

    <tabbar :items="tabbar" :active="0" @click="onTabBarClick"></tabbar>

    <message-more-operate ref="moreOprerate" @alert="onAlert" :items="moreItems"></message-more-operate>

    <Alert ref="alert"></Alert>

  </div>
</template>


<script>
  import MyHeader from 'components/MyHeader';
  import Tabbar from 'components/Tabbar';
  import Alert from 'components/Alert';
  import MessageMoreOperate from 'components/message/MessageMoreOperate';

  export default {
    components: {
      MyHeader,
      Tabbar,
      Alert,
      MessageMoreOperate,
    },
    props: {},
    data(){
      return {
        isLoadingMessage: true,
        moreItems: [
          {icon: 'icon-chatadd', title: '创建群聊', to:{path:''}},
          {icon: 'icon-friendadd', title: '加好友/群', to:{path:''}},
          {icon: 'icon-scan', title: '扫一扫', to:{path:''}},
          {icon: 'icon-transfor', title: '面对面快传', to:{path:''}},
          {icon: 'icon-barcode', title: '付款', to:{path:''}},
          {icon: 'icon-camera', title: '拍摄', to:{path:''}},
          {icon: 'icon-redpacket', title: '面对面红包', to:{path:''}},
        ],
        tabbar:[
          {
            icon: 'icon-message',
            icon_active: 'icon-message1',
            title: '消息',
            count: 12,
          },
          {
            icon: 'icon-man',
            icon_active: 'icon-man1',
            title: '联系人',
            count: 0,
          },
          {
            icon: 'icon-star1',
            icon_active: 'icon-star',
            title: '动态',
            count: -1,
          },
        ],
      }
    },
    computed: {
      getUserinfo(){
        let {nickname, headimg} = this.$store.getters.getUserInfo;
        return {nickname, headimg}
      },
    },
    methods: {
      onLeftClick(){
        this.$emit('operate')
      },
      onRightClick(){
        this.$refs.moreOprerate.show();
      },
      onLoaded(type){
        if(type=='message'){
          this.isLoadingMessage = false;
        }
      },
      onHomeMove(mx){
        this.$emit('homemove', mx);
      },
      onHomeSwipe(flag){
        if(flag){ this.$emit('operate')}
        else{this.$emit('hide')}
      },
      onTabBarClick(index){
        if(index == 1){
          this.$router.push({
            path: '/home/contact/list'
          })
        }else if(index == 2){
          this.$router.push({
            path: '/home/dynamic/list'
          })
        }
      },
      onAlert(option){
        this.$refs.alert.show(option)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme.less";
  .message-page{
    .tab-headimg{
      position: relative;
      font-size: 0;
      img{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
      .badge{
        position: absolute;
        left: .8rem;
        top:0
      }
    }
    .tab-add{
      font-size: 0;
      .iconfont{
        font-size: .8rem!important;
        line-height: .8rem;
      }
    }
    .tab-btn{
      position: relative;
      margin: 0 auto;
      line-height: .9rem;
      width: 4.4rem;
      border-radius: 3px;
      border: 1px solid @colorFFF;
      color: #fff;
      font-size: 0;
      .icon-loading{
        position: absolute;
        top: .15rem;
        left: -.8rem;
      }
      .item{
        width: 50%;
        font-size: .45rem;
        &.active{
          color: @colorSuccess;
          background: @colorFFF;
        }
      }
    }
  }
</style>
