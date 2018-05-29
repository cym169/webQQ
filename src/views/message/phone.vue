<template>
  <touch-move v-title="'电话'" class="home-message-phone page" ref="touchmove" :refresh="true" :isswipe="true"
              @refresh="onRefresh" @refreshstep="onRefreshStep" @click="onClick" @target="onTouchTarget" @swipemove="onSwipeMove" @swipe="onSwipe">

    <refresh-bar slot="refresh" :refreshStep="refreshStep"></refresh-bar>

    <template slot="content">
      <div class="msgs-search content content-v">
        <search :status="false" @start="onSearchClick"></search>
      </div>

      <div>
        <phone-item v-for="item in sysItems" :data="item" :data-title="item.title"></phone-item>
        <div class="tip">
          <div class="content">通话记录</div>
        </div>
        <phone-item v-for="(item, index) in callItems" :data="item" :key="item.id" :move-x="getItemMove(item.id)" :data-id="item.id"
                    @phone="onPhoneClick(index)" @delete="onDelete(index)"></phone-item>
      </div>

      <div class="content-v text-center">
        <div class="content-v">
          <span class="more-friends" @click="onMoreClick">更多QQ电话好友...</span>
        </div>
      </div>
    </template>

  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import Search from 'components/Search';
  import PhoneItem from 'components/message/PhoneItem';
  import RefreshBar from 'components/message/RefreshBar';

  import { phoneList } from 'servers/API/message';
  import { isElement } from 'utils/domElement';

  export default {
    components: {
      TouchMove,
      RefreshBar,
      Search,
      PhoneItem,
    },
    props: {},
    data() {
      return {
        refreshStep: 0,
        sysItems:[
          {id: 1, title: '电话黄页', icon:'icon-arrowright', headimg: require('assets/images/common/headimg_def.jpg'), status: 1, to:{name:''}},
          {id: 2,title: '通讯录', icon:'icon-arrowright', headimg: require('assets/images/common/headimg_def.jpg'), status: 1, to:{name:''}},
        ],
        callItems: [],
        swipeTargetId: null,
        swipeTargetAcitiveId: null,
        itemX: 0,
        swipeActive: false,
        canClick: true,
      }
    },
    created(){
      phoneList({
        tempShow: false
      }).then(res=>{
        this.$emit('loaded', 'message');
        this.callItems = res.items;
      })
    },
    methods: {
      onRefreshStep(step){
        this.refreshStep = step
      },
      onRefresh(){
        phoneList({
          tempShow: false
        }).then(res=>{
          this.$emit('loaded', 'message');
          this.callItems = res.items;
          this.refreshStep = 3;
          setTimeout(()=>{
            this.$refs.touchmove && this.$refs.touchmove.reset();
          }, 500)
        })
      },
      onSearchClick(){
        this.$router.push({
          name: 'search/friend'
        })
      },
      onItemClick(title){
        this.$emit('alert', {
          title: '',
          content: '跳转'+title,
          btns: ['确定']
        })
      },
      onPhoneClick(index){
        this.$emit('alert', {
          title: '',
          content: '调用QQ语音',
          btns: ['确定']
        })
      },
      onMoreClick(){
        this.$emit('alert', {
          title: '',
          content: '跳转语音大厅',
          btns: ['确定']
        })
      },
      onClick(dom){
        var tdom = isElement(dom, 'cphone');
        if(!this.canClick){
          this.swipeActive = false;
          this.swipeTargetId = null;
          this.swipeTargetAcitiveId = null;
          this.canClick = true;
        }else if(tdom){
          return
        }else{
          tdom = isElement(dom, 'phone-item');
          if(tdom){
            if(tdom.dataset.title){
              this.onItemClick(tdom.dataset.title)
            }else{
              let id = tdom.dataset.id;
              this.$router.push({
                name: 'message/history',
                params: {
                  id
                }
              })
            }
          }
        }
      },
      getItemMove(id){
        if(this.swipeTargetAcitiveId){
          return this.swipeTargetId == id ? -2*window.REM_SIZE : 0
        }else{
          return this.swipeTargetId == id ? this.itemX : 0
        }
      },
      onTouchTarget(target){
        this.swipeActive = false;
        let element = isElement(target, 'phone-item');
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
          this.canClick = false;
          this.swipeTargetId && (this.swipeActive = true)
          this.swipeTargetAcitiveId = this.swipeTargetId
        }
      },
      onDelete(index){
        this.callItems.splice(index, 1)
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .home-message-phone{
    .msgs-search{
      background: @colorFFF;
    }
    .more-friends{
      color: @colorSuccess;
    }
  }
</style>
