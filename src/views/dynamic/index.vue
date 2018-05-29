<template>
  <div v-title="'动态'" class="contact-page container has-header has-tabbar" >
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick">
      <div slot="left" class="tab-headimg" >
        <img :src="getUserinfo.headimg" />
        <i class="badge small" v-if="getUserinfo.isnew"></i>
      </div>
      <div slot="title" class="text-center">
        <div>动态</div>
      </div>
      <div slot="right" class="tab-add" >更多</div>
    </my-header>

    <router-view @alert="onAlert" @homemove="onHomeMove" @homeswipe="onHomeSwipe"></router-view>

    <tabbar :items="tabbar" :active="2" @click="onTabBarClick"></tabbar>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Tabbar from 'components/Tabbar';
  import Alert from 'components/Alert';

  export default {
    components: {
      MyHeader,
      Tabbar,
      Alert,
    },
    props: {},
    data(){
      return {
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
        ]
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
        this.$router.push({
          name: 'dynamic/more'
        })
      },
      onHomeMove(mx){
        this.$emit('homemove', mx);
      },
      onHomeSwipe(flag){
        if(flag){ this.$emit('operate')}
        else{this.$emit('hide')}
      },
      onAlert(option){
        this.$refs.alert.show(option)
      },
      onTabBarClick(index){
        if(index == 1){
          this.$router.push({
            path: '/home/contact/list'
          })
        }else if(index == 0){
          this.$router.push({
            path: '/home/message/msgs'
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .contact-page{
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
  }
</style>
