<template>
  <div v-title="'添加'" class="friend-add-page container has-header " >
    <my-header @leftClick="onLeftClick" >
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">添加</div>
    </my-header>

    <div class="add-content">
      <div class="add-nav">
        <my-nav :items="items" :isavg="true" @click="onItemClick" :current="current"></my-nav>
      </div>
      <router-view @search="onSearchClick" @alert="onAlert" @add="onAdd"></router-view>
    </div>

    <alert ref="alert"></alert>

    <friend-add ref="friendadd"></friend-add>

    <friend-search ref="friendsearch" @alert="onAlert" ></friend-search>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import MyNav from 'components/MyNav';
  import Alert from 'components/Alert';
  import FriendAdd from 'components/friend/FriendAdd';
  import FriendSearch from 'components/friend/FriendSearch';

  export default {
    components: {
      MyHeader,
      MyNav,
      Alert,
      FriendAdd,
      FriendSearch,
    },
    props: {},
    data(){
      return {
        current: 0,
        items: ['找人', '找群', '找公众号'],
      }
    },
    mounted(){
      let path = this.$route.fullPath;
      if(path.indexOf('person') > -1){
        this.current = 0
      }else if(path.indexOf('group') > -1){
        this.current = 1
      }else{
        this.current = 2
      }
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onItemClick(index){
        let p = 'person';
        if(index == 1){ p = 'group'}
        else if(index == 2){ p = 'public'}
        this.$router.push({
          path: '/friend/add/'+p
        })
      },
      onSearchClick(){
        this.$refs.friendsearch.show()
      },
      onAlert(option){
        this.$refs.alert.show(option)
      },
      onAdd(id){
        this.$refs.friendadd.show(id)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .friend-add-page{
    .add-content{
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 1.4rem;

      .add-nav{
        color: @color000;
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        z-index: 9;
        border-bottom: 1px solid @colorBorder;
      }
    }
    .friend-add-search{
      color: @colorBBB;
      font-size: .45rem;
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      background: @colorFFF;
      padding: .3rem .4rem;
      .iconfont{
        font-size: .6rem;
        line-height: .8rem;
      }
    }
  }
</style>
