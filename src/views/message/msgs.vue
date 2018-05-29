<template>
  <touch-move v-title="'消息'" class="home-message-msgs page" ref="touchmove" :refresh="true" :isswipe="true"
              @refresh="onRefresh" @refreshstep="onRefreshStep" @click="onClick" @target="onTouchTarget" @swipemove="onSwipeMove" @swipe="onSwipe">

    <refresh-bar slot="refresh" :refreshStep="refreshStep"></refresh-bar>

    <template slot="content">
      <div class="msgs-search content content-v">
        <search :status="false" @start="onSearchClick"></search>
      </div>
      <router-link to="" tag="div" class="banner-ad" v-if="isBannerAdShow">
        <img :src="bannerAd" class="img-100" />
        <i class="iconfont icon-delete delete type-border active" @click="onBannerAdCloseClick" ></i>
      </router-link>

      <div>
        <message-item v-for="(item, index) in messageItems" :key="item.id"
                      :data="item" :move-x="getItemMove(item.id, item.count)" :data-id="item.id" :data-type="item.type"
                      @totop="onToTop(index)" @read="onRead(index)" @delete="onDelete(index)"></message-item>
      </div>

    </template>
  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import Search from 'components/Search';
  import MessageItem from 'components/message/MessageItem';
  import RefreshBar from 'components/message/RefreshBar';

  import { messageList } from 'servers/API/message';
  import { isElement } from 'utils/domElement';

  export default {
    components: {
      TouchMove,
      RefreshBar,
      Search,
      MessageItem,
    },
    props: {},
    data() {
      return {
        refreshStep: 0,
        bannerAd: '',
        isBannerAdShow: false,
        messageItems: [],
        swipeTargetId: null,
        swipeTargetAcitiveId: null,
        itemX: 0,
        swipeActive: false,
        canClick: true,
      }
    },
    created(){
      messageList({
        tempShow: false
      }).then(res=>{
        this.$emit('loaded', 'message');
        this.isBannerAdShow = res.bannerAd ? true : false;
        this.bannerAd = res.bannerAd;
        this.messageItems = res.items;
      })
    },
    methods: {
      onSearchClick(){
        this.$router.push({
          name: 'search/friend'
        })
      },
      onBannerAdCloseClick(event){
        this.isBannerAdShow = false
      },
      onRefreshStep(step){
        this.refreshStep = step
      },
      onRefresh(){
        messageList({
          tempShow: false
        }).then(res=>{
          this.$emit('loaded', 'message');
          this.isBannerAdShow = res.bannerAd ? true : false;
          this.bannerAd = res.bannerAd;
          this.messageItems = res.items;
          this.refreshStep = 3;
          setTimeout(()=>{
            this.$refs.touchmove && this.$refs.touchmove.reset();
          }, 500)
        })
      },
      onClick(dom){
        dom = isElement(dom, 'message-item');
        if(!this.canClick){
          this.swipeActive = false;
          this.swipeTargetId = null;
          this.swipeTargetAcitiveId = null;
          this.canClick = true;
        }else if(dom){
          let id = dom.dataset.id;
          id && this.$router.push({
            name: 'chat',
            params: { id, type: dom.dataset.type }
          })
        }
      },
      getItemMove(id, count){
        let move = 0;
        if(this.swipeTargetAcitiveId){
          move = this.swipeTargetId == id ? (count>0?-6.5*window.REM_SIZE:-4*window.REM_SIZE) : 0
        }else{
          move = this.swipeTargetId == id ? this.itemX : 0
        }
        return move;
      },
      onTouchTarget(target){
        this.swipeActive = false;
        let element = isElement(target, 'message-item');
        if(element){
          this.swipeTargetId = element.dataset.id
        }else{
          this.swipeTargetId = null;
        }
        this.itemX = 0;
        setTimeout(()=>{
          this.swipeTargetAcitiveId = null;
        }, 100)
      },
      onSwipeMove(mx){
        !this.swipeActive && mx>0 && this.$emit('homemove', mx);
        if(!this.swipeActive){
          mx<0 && (this.itemX = mx)
        }
      },
      onSwipe(arrow){
        if(arrow == 'cancel'){
          this.itemX = 0;
          this.$emit('homeswipe', false);
        }else if(arrow=='right'){
          !this.swipeActive && this.$emit('homeswipe', true);
          this.itemX = 0;
          this.swipeActive = false;
          this.canClick = true;
        }else if(arrow=='left'){
          this.swipeActive = true;
          this.canClick = false;
          this.swipeTargetAcitiveId = this.swipeTargetId
        }
      },
      onToTop(index){
        let item = this.messageItems.splice(index, 1)[0];
        this.messageItems.unshift(item)
      },
      onRead(index){
        this.messageItems[index].count = 0;
      },
      onDelete(index){
        this.messageItems.splice(index, 1)
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .home-message-msgs{
    .msgs-search{
      background: @colorFFF;
    }
    .banner-ad{
      position: relative;
      animation: scaleIn .5s both;
      .delete{
        position: absolute;
        right: .2rem;
        top: 50%;
        margin-top: -.25rem;
      }
    }
  }
</style>
