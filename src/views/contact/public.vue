<template>
  <div v-title="'公众号'" class="contact-public-page container has-header" >
    <my-header @leftClick="onLeftClick" >
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title">公众号</div>
    </my-header>

    <div class="page">

      <div class="content content-v bg-fff" :class="{'group-search': searchShow}">
        <search @start="onSearchStart" @input="onSearchInput" @cancel="onSearchCancel"></search>
      </div>

      <template v-for="(item, key) in items">
        <div class="content">
          <div class="tip text-upper" v-text="key"></div>
        </div>
        <group-item v-for="obj in item" :data="obj" @click="onGroupClick(obj.title)" ></group-item>
      </template>

    </div>

    <div class="mask" v-show="searchShow">
      <template v-for="(item, key) in items">
        <group-item v-for="obj in item" :data="obj" @click="onGroupClick(obj.title)" v-show="searchItem(obj.title)"></group-item>
      </template>
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

  import { MyPublicList } from 'servers/API/contact';

  export default {
    components: {
      MyHeader,
      Alert,
      MyNav,
      Search,
      GroupItem,
    },
    props: {},
    data(){
      return {
        searchShow: false,
        searchTxt: '',
        items: {},
      }
    },
    mounted(){
      MyPublicList({account: this.$store.getters.getUserInfo.account}).then(res=>{
        this.items = res
      })
    },
    methods: {
      searchItem(title){
        return this.searchTxt=='' ? false : title.indexOf(this.searchTxt)>-1
      },
      onLeftClick(){
        this.$router.back()
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
      onGroupClick(title){
        this.onAlert({
          title: '',
          content: '跳转到公众号'+title,
          btns: ['确定']
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

  .contact-public-page{
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
