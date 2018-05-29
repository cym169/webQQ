<template>
  <touch-move class="friend-add-person page " >
    <div slot="content" class="person-page">
      <div class="bar"></div>
      <div class="friend-add-search flex" @click="onSearchClick">
        <i class="iconfont icon-search "></i>
        <span class="flex-item ">QQ号/手机号/群/公众号</span>
      </div>
      <div class="bar"></div>

      <friend-new-item v-for="(item, index) in items" :data="item" @click="onItemClick(index)"></friend-new-item>

      <div class="bar"></div>

      <div class="top-border">
        <div class="float-fixed content content-v">
          <div class="fl">可能认识的人</div>
          <router-link class="fr" tag="div" :to="{name: 'friend/mayknow'}">
            <span>查看更多</span>
            <i class="iconfont icon-arrowright"></i>
          </router-link>
        </div>
        <div class="friend-add-person_list inline-row">
          <div class="item text-center" v-for="(item, index) in friends" :key="item.id">
            <img :src="item.headimg" />
            <div class="text-over" v-text="item.title"></div>
            <div class="tip" v-text="item.count+'位共同好友'"></div>
            <div class="button btn-small btn-normal" @click="onAddClick(index)">添加</div>
            <i class="iconfont icon-delete" @click="onDelClick(index)"></i>
          </div>
        </div>
      </div>
    </div>
  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import FriendNewItem from 'components/friend/FriendNewItem';

  import { FriendMayKnow } from 'servers/API/friend';

  export default {
    components: {
      TouchMove,
      FriendNewItem,
    },
    props: {},
    data(){
      return {
        value: '',
        items: [
          {icon: 'icon-maillist', title: '添加手机联系人', sta: -2, tip: '好友1、好友2、好友3'},
          {icon: 'icon-scan', title: '扫一扫添加好友', sta: -2, tip: ''},
          {icon: 'icon-chatadd', title: '面对面发起多人聊天', sta: -2, tip: '与身边的好友进入同一个多人聊天'},
          {icon: 'icon-search', title: '按条件查找陌生人', sta: -2, tip: '条件：女、18-26岁、合肥'},
          {icon: 'icon-location', title: '查看附近的人', sta: -2, tip: ''},
        ],
        friends: []
      }
    },
    mounted(){
      FriendMayKnow().then(res=>{
        this.friends = res
      })
    },
    methods: {
      onSearchClick(){
        this.$emit('search')
      },
      onItemClick(index){
        this.$emit('alert',{
          title: '',
          content: '此处跳转到"'+this.items[index].title+'"业务模块',
          btns: ['确定']
        })
      },
      onAddClick(index){
        this.$emit('add', this.friends[index].id)
      },
      onDelClick(index){
        this.friends.splice(index, 1)
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .friend-add-person{
    .top-border{
      background: @colorFFF;
    }
    .friend-add-person_list{
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      white-space: nowrap;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .item{
        position: relative;
        width: 2.8rem;
        margin: .2rem;
        img{
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          margin: .2rem 0;
        }
        .icon-delete{
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
</style>
