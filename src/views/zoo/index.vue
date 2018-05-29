<template>
  <div v-title="'好友动态'" class="zoo-page container ">
    <my-header @leftClick="onLeftClick" :bgcol="headerBg">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">动态</span></div>
      <div slot="title" class="zoo-header-title">
        <i class="iconfont icon-loading" v-show="isRefresh"></i>
        <div>好友动态</div>
      </div>
    </my-header>

    <touch-move class="home-message-msgs page" ref="touchmove" :refresh="true" :loading="true"
              @refresh="onRefresh" @loading="onLoading" @scroll="onScroll">
      <div slot="refresh" class="zoo-refresh text-center ">
        <i class="iconfont icon-qqzoo1"></i>
      </div>
      <template slot="content">
        <div class="zoo-top" >
          <div class="zoo-top-bg" :style="'background-image:url('+info.bgimg+')'"></div>
          <img class="headimg" :src="info.headimg" />
          <div class="flex text-center">
            <div class="flex-item">相册</div>
            <div class="flex-item">说说</div>
            <div class="flex-item">个性化</div>
            <div class="flex-item">小游戏</div>
            <div class="flex-item">消息</div>
          </div>
        </div>

        <zoo-msg-item v-for="(item, index) in items" :data="item"
                      @share="onShare" @like="onLike(index)" @imgclick="onImgView" @commont="onCommont(index)" @send="onSend(index)" @packet="onRedpacket(index)" ></zoo-msg-item>

      </template>
      <div slot="loading" class="zoo-loading content-v text-center flex tip">
        <i class="iconfont icon-loading"></i>
        <span>正在加载...</span>
      </div>
    </touch-move>

    <zoo-comment :type="commentType" :active="commontActive" @send="onCommentSend" @alert="onAlert" @close="onCommentClose"></zoo-comment>

    <zoo-red-packet :active="redpacketActive" :data="redpacketData" @send="onRedPacketSend" @close="onRedPacketClose"></zoo-red-packet>

    <zoo-share ref="share"></zoo-share>

    <alert ref="alert"></alert>

    <toast-msg ref="toastmsg"></toast-msg>

    <image-view ref="imageview"></image-view>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import TouchMove from 'components/TouchMove';
  import Alert from 'components/Alert';
  import ImageView from 'components/ImageView';
  import ToastMsg from 'components/ToastMsg';
  import ZooMsgItem from 'components/zoo/ZooMsgItem';
  import ZooComment from 'components/zoo/ZooComment';
  import ZooShare from 'components/zoo/ZooShare';
  import ZooRedPacket from 'components/zoo/ZooRedPacket';

  import { ZooFriendInfo, ZooMessages, ZooMsgComment, ZooMsgSend, ZooSendRedpacket } from 'servers/API/zoo';

  export default {
    components: {
      MyHeader,
      TouchMove,
      Alert,
      ImageView,
      ToastMsg,
      ZooMsgItem,
      ZooComment,
      ZooShare,
      ZooRedPacket,
    },
    props: {},
    data() {
      return {
        id: this.$route.params.id || this.$store.getters.getUserInfo.account,
        isRefresh: false,
        activeIndex: '',
        commentType: 1,
        commontActive: false,
        redpacketActive: false,
        redpacketData: {},
        page: 1,
        moveO: 0,
        info: {},
        myinfo: {},
        items: [],
      }
    },
    computed: {
      headerBg(){
        return 'rgba(30, 185, 242, '+this.moveO+')'
      }
    },
    mounted(){
      this.myinfo = this.$store.getters.getUserInfo;
      ZooFriendInfo({id: this.id}).then(res=>{
        this.info = res
      })
      this.onRefresh();
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onScroll(top){
        this.moveO = top/2/window.REM_SIZE
      },
      onRefresh(){
        this.page = 1;
        this.isRefresh = true;
        this.items = [];
        ZooMessages({id: this.id, page: this.page}).then(res=>{
          this.items = res;
          this.page++;
          this.isRefresh = false;
          this.$refs.touchmove.reset();
        })
      },
      onLoading(){
        ZooMessages({id: this.id, page: this.page}).then(res=>{
          this.items.push(...res);
          this.page++;
          this.$refs.touchmove.reset();
        })
      },
      onAlert(option){
        this.$refs.alert.show(option)
      },
      onLike(index){
        this.items[index].liked = !this.items[index].liked;
        if(this.items[index].liked){
          this.items[index].likes.push({
            id: this.myinfo.account,
            nickname: this.myinfo.nickname,
          })
        }else{
          for(let i=0; i<this.items[index].likes.length; i++){
            if(this.items[index].likes[i].id == this.myinfo.account){
              this.items[index].likes.splice(i, 1)
              return
            }
          }
        }
      },
      onShare(params){
        let id = params.id;
        this.$refs.share.show(params.event.clientY, 15, title=>{
          this.$refs.toastmsg.show({
            status: 1,
            title: title
          })
        })
      },
      onImgView(params){
        this.$refs.imageview.show(params)
      },
      onCommont(index){
        this.commentType = 1;
        this.commontActive = true;
        this.activeIndex = index;
      },
      onSend(index){
        this.commentType = 2;
        this.commontActive = true;
        this.activeIndex = index;
      },
      onRedpacket(index){
        this.redpacketData = {
          id: this.items[index].id,
          headimg: this.items[index].headimg,
          title: this.items[index].title,
        };
        this.redpacketActive = true;
      },
      onRedPacketSend(value){
        ZooSendRedpacket({id: this.redpacketData.id, value}).then(res=>{
          this.$refs.toastmsg.show({
            status: 1,
            title: '红包已发送'
          })
        })
      },
      onRedPacketClose(){
        this.redpacketData = {};
        this.redpacketActive = false;
      },
      onCommentSend(value){
        if(this.commentType == 1){
          ZooMsgComment({id: this.items[this.activeIndex].id, value}).then(res=>{
            this.commontActive = false;
            this.items[this.activeIndex].commont.push({
              names: [this.myinfo.nickname],
              message: value
            })
            this.$refs.toastmsg.show({
              status: 1,
              title: '评论成功'
            })
          })
        }else{
          ZooMsgSend({id: this.items[this.activeIndex].id, value}).then(res=>{
            this.$refs.toastmsg.show({
              status: 1,
              title: '转发成功'
            })
            this.commontActive = false;
          })
        }
      },
      onCommentClose(){
        this.commontActive = false
      }
    }
  }
</script>


<style lang="less">
  @import "../../assets/less/theme";
  .zoo-page{
    .zoo-header-title{
      position: relative;
      display: inline-block;
      .icon-loading{
        position: absolute;
        right: 100%;
        top: 50%;
        margin-top: -.3rem;
      }
    }
    .zoo-refresh{
      background: @colorBlack;
      padding-top: 5rem;
      opacity: .8;
      .iconfont{
        font-size: .8rem;
        line-height: 1rem;
        color: @color777;
      }
    }
    .zoo-loading{
      background: rgba(0,0,0,.2);
    }
    .zoo-top{
      position: relative;
      color: @colorFFF;
      padding-top: 4rem;
      .zoo-top-bg{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background-position: center;
        background-size: cover;
        filter: blur(5px);
        z-index: 1;
      }
      .headimg{
        position: relative;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        box-shadow: 0 0 0 1px @colorFFF;
        margin-left: .6rem;
        margin-bottom: .5rem;
        z-index: 2;
      }
      .flex{
        position: relative;
        font-size: .4rem;
        height: 1.2rem;
        z-index: 2;
        background: -webkit-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,.6));
      }
    }
  }
</style>
