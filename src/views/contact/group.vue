<template>
  <div v-title="'群聊'" class="contact-group-page container " >
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title">群聊</div>
      <div slot="right" class="tab-add" >
        <i class="iconfont icon-add"></i>
      </div>
    </my-header>

    <div class="page">
      <div class="group-nav bg-fff bottom-border">
        <my-nav :items="['我的群', '多人聊天']" :current="0" @click="onNavClick"></my-nav>
      </div>

      <div class="content content-v bg-fff" :class="{'group-search': searchShow}">
        <search @start="onSearchStart" @input="onSearchInput" @cancel="onSearchCancel"></search>
      </div>

      <div v-show="active == 0">
        <div class="content"><div class="tip">我管理的群({{groupMine.length}})</div></div>
        <group-item v-for="item in groupMine" :data="item" @click="onGroupClick(item.id)" ></group-item>
        <div class="content"><div class="tip">我加入的群({{groupJoin.length}})</div></div>
        <group-item v-for="item in groupJoin" :data="item" @click="onGroupClick(item.id)" ></group-item>
      </div>
      <div v-show="active == 1">
        <div class="content"><div class="tip">全部多人聊天</div></div>
        <group-item v-for="item in groupAll" :data="item" @click="onGroupClick(item.id)" ></group-item>
      </div>

    </div>

    <message-more-operate ref="moreOprerate" @alert="onAlert" :items="moreItems"></message-more-operate>

    <div class="mask" v-show="searchShow">
      <group-item v-for="item in groupMine" :data="item" @click="onGroupClick(item.id)" v-show="searchItem(item.title)"></group-item>
      <group-item v-for="item in groupJoin" :data="item" @click="onGroupClick(item.id)" v-show="searchItem(item.title)"></group-item>
      <group-item v-for="item in groupAll" :data="item" @click="onGroupClick(item.id)" v-show="searchItem(item.title)"></group-item>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import MyNav from 'components/MyNav';
  import Search from 'components/Search';
  import GroupItem from 'components/contact/GroupItem';
  import MessageMoreOperate from 'components/message/MessageMoreOperate';

  import { MyGroupInfo } from 'servers/API/contact';

  export default {
    components: {
      MyHeader,
      Alert,
      MyNav,
      Search,
      GroupItem,
      MessageMoreOperate,
    },
    props: {},
    data(){
      return {
        active: 0,
        searchShow: false,
        searchTxt: '',
        moreItems: [
          {icon: 'icon-friendgroup1', title: '创建群', to:{path:''}},
          {icon: 'icon-search', title: '查找群', to:{path:''}},
          {icon: 'icon-setting', title: '群消息设置', to:{path:''}},
          {icon: 'icon-chatadd', title: '创建群聊', to:{path:''}},
        ],
        groupMine: [],
        groupJoin: [],
        groupAll: [],
      }
    },
    mounted(){
      MyGroupInfo({account: this.$store.getters.getUserInfo.account}).then(res=>{
        this.groupMine = res.groupMine;
        this.groupJoin = res.groupJoin;
        this.groupAll = res.groupAll;
      })
    },
    methods: {
      searchItem(title){
        return this.searchTxt=='' ? false : title.indexOf(this.searchTxt)>-1
      },
      onLeftClick(){
        this.$router.back()
      },
      onRightClick(){
        this.$refs.moreOprerate.show();
      },
      onNavClick(index){
        this.active = index
      },
      onSearchStart(){
        this.searchShow = true
      },
      onSearchInput(value){
        this.searchTxt = value
      },
      onSearchCancel(){
        this.searchShow = false
      },
      onGroupClick(id){
        this.$router.push({
          name:'chat',
          params: {
            type: 2,
            id
          }
        })
      },
      onAlert(option){
        this.$refs.alert.show(option)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .contact-group-page{
    padding-top: 2.7rem;
    .tab-add{
      font-size: 0;
      .iconfont{
        font-size: .8rem!important;
        line-height: .8rem;
      }
    }
    .group-nav{
      position: absolute;
      left:0;
      right: 0;
      top: 1.4rem;
      z-index: 9;
    }
    .group-search{
      position: absolute;
      left:0;
      top:0;
      right:0;
      z-index: 1000;
    }
    .mask{
      padding-top: 1.6rem;
    }
  }
</style>
