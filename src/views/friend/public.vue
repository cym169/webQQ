<template>
  <touch-move class="friend-add-group page " ref="touchmove" :refresh="true"
              @refresh="onRefresh" @refreshstep="onRefreshStep">

    <refresh-bar slot="refresh" :refreshStep="refreshStep"></refresh-bar>

    <div slot="content" class="person-page">
      <div class="bar"></div>
      <div class="friend-add-search flex" @click="onSearchClick">
        <i class="iconfont icon-search "></i>
        <span class="flex-item ">QQ号/手机号/群/公众号</span>
      </div>
      <div class="bar"></div>

      <div class="content bg-fff bottom-border">
        <div class="tip">精品推荐</div>
      </div>

      <group-item v-for="item in items" :data="item" type="public"></group-item>

      <div class="bar"></div>

    </div>
  </touch-move>
</template>


<script>
  import TouchMove from 'components/TouchMove';
  import GroupItem from 'components/friend/GroupItem';
  import RefreshBar from 'components/message/RefreshBar';

  import { FriendPublicFind } from 'servers/API/friend';

  export default {
    components: {
      TouchMove,
      GroupItem,
      RefreshBar,
    },
    props: {},
    data(){
      return {
        refreshStep: 0,
        items: []
      }
    },
    mounted(){
      FriendPublicFind({isShow: false}).then(res=>{
        this.items = res;
      })
    },
    methods: {
      onRefreshStep(step){
        this.refreshStep = step
      },
      onRefresh(){
        FriendPublicFind({isShow: false}).then(res=>{
          this.items = res;
          this.refreshStep = 3;
          setTimeout(()=>{
            this.$refs.touchmove && this.$refs.touchmove.reset();
          }, 500)
        })
      },
      onSearchClick(){
        this.$emit('search')
      },
      onItemClick(title){
        this.$emit('alert', {
          title: '',
          content: '此处跳转到"'+title+'"公众号',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .friend-add-group{
    .add-group_title{
      justify-content: flex-start;
      color: @color000;
      background: @colorFFF;
      .iconfont{
        color: @colorFFF;
        width: .6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        margin-right: .2rem;
        border-radius: 2px;
        &.icon-public{
          background: #f68a42;
        }
        &.icon-location1{
          background: #fea700;
        }
        &.icon-star2{
          background: #fd8484;
        }
        &.icon-flag{
          background: #59669b;
        }
        &.icon-tribe{
          background: #61d0f2;
        }
      }
    }
    .add-group_kind{
      background: @colorFFF;
      .item{
        width: 2.4rem;
        margin: .3rem;
        .iconfont{
          font-size: 1.4rem;
          line-height: 1.6rem;
        }
      }
    }
    .add-group_events{
      background: @colorFFF;
      .content{
        padding-top: .3rem;
        padding-bottom: .3rem;
        width: 50%;
        font-size: .3rem;
        img{
          width: 1.2rem;
          height: 1.8rem;
        }
        .flex-item{
          padding-left: .2rem;
          div{
            line-height: .6rem;
            overflow: hidden;
            &:first-child{
              height: 1.2rem;
            }
          }
        }
      }
    }
    .add-group_interest{
      background: @colorFFF;
      flex-wrap: wrap;
      .content{
        padding-top: .3rem;
        padding-bottom: .3rem;
        width: 50%;
        font-size: .3rem;
        img{
          width: 1rem;
          height: 1rem;
        }
        .flex-item{
          padding-left: .2rem;
          line-height: .5rem;
        }
      }
    }
  }
</style>

