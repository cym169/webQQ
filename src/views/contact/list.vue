<template>
  <touch-move v-title="'联系人'" class="home-contact-list page" ref="touchmove" :refresh="true" :isswipe="true"
              @refresh="onRefresh" @refreshstep="onRefreshStep" @click="onClick" @target="onTouchTarget" @swipemove="onSwipeMove" @swipe="onSwipe">

    <refresh-bar slot="refresh" :refreshStep="refreshStep" :lastRefresh="lastRefresh"></refresh-bar>

    <template slot="content">
      <div class="msgs-search content content-v">
        <search :status="false" @start="onSearchClick"></search>
      </div>

      <div class="contact-list-tab flex text-center">
        <router-link class="flex-item" :to="{name:'friend/new'}" tag="div">
          <i class="iconfont icon-friendnew"></i>
          <div>新朋友</div>
        </router-link>
        <router-link class="flex-item" :to="{name: 'contact/group'}" tag="div">
          <i class="iconfont icon-friendgroup"></i>
          <div>群聊</div>
        </router-link>
        <router-link class="flex-item" :to="{name: 'contact/public'}" tag="div">
          <i class="iconfont icon-public"></i>
          <div>公众号</div>
        </router-link>
      </div>

      <tree-box title="特别关心" :tip="getTreeTip(special)">
        <template slot="content">
          <ContactItem v-for="item in special" :data="item" :key="item.id" :data-id="item.id" :data-type="1"></ContactItem>
        </template>
      </tree-box>
      <tree-box title="常用群聊" :tip="getTreeTip(often)">
        <template slot="content">
          <ContactItem v-for="item in often" :data="item" :key="item.id" :data-id="item.id" :data-type="2"></ContactItem>
        </template>
      </tree-box>

      <div class="bar"></div>
      <div>
        <tree-box v-for="items in groups" :title="items.title" :tip="getTreeTip(items.list)">
          <template slot="content">
            <ContactItem v-for="(item, index) in items.list" :data="item" :key="item.id" :data-id="item.id" :data-type="1" :move-x="getItemMove(item.id)" @setting="onSetting(item)"></ContactItem>
          </template>
        </tree-box>
      </div>

      <div class="bar"></div>

      <tree-box title="手机通讯录" :tip="getTreeTip(cellphone)">
        <template slot="content">
          <ContactItem v-for="item in cellphone" :data="item" :key="item.id" :data-id="item.id" :data-type="1"></ContactItem>
        </template>
      </tree-box>
      <tree-box title="我的设备" :tip="getTreeTip(device)">
        <template slot="content">
          <ContactItem v-for="item in device" :data="item" :key="item.id" :data-id="item.id" :data-type="3"></ContactItem>
        </template>
      </tree-box>

    </template>
  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import Search from 'components/Search';
  import RefreshBar from 'components/message/RefreshBar';
  import TreeBox from 'components/contact/TreeBox';
  import ContactItem from 'components/contact/ContactItem';

  import { contactList } from 'servers/API/contact';
  import { isElement } from 'utils/domElement';

  export default {
    components: {
      TouchMove,
      RefreshBar,
      Search,
      TreeBox,
      ContactItem,
    },
    props: {},
    data() {
      return {
        refreshStep: 0,
        lastRefresh: '上次更新：下午1:30',
        special: [],
        often: [],
        groups: {},
        cellphone: [],
        device: [],
        swipeTargetId: null,
        swipeTargetAcitiveId: null,
        itemX: 0,
        swipeActive: false,
        canClick: true,
      }
    },
    created(){
      contactList({
        tempShow: false
      }).then(res=>{
        this.special = res.special;
        this.often = res.often;
        this.groups = res.groups;
        this.cellphone = res.cellphone;
        this.device = res.device;
      })
    },
    methods: {
      onSwipeMove(mx){
        mx>0 && this.$emit('homemove', mx);
      },
      onSwipe(arrow){
        if(arrow == 'cancel'){
          this.$emit('homeswipe', false);
        }else if(arrow=='right'){
          this.$emit('homeswipe', true);
        }else if(arrow=='left'){
        }
      },
      getTreeTip(list){
        let online = 0;

        for(let key in list){
          list[key].online != '' && online++
        }
        return online+'/'+list.length
      },
      onSearchClick(){
        this.$router.push({
          name: 'search/friend'
        })
      },
      onRefreshStep(step){
        this.refreshStep = step
      },
      onRefresh(){
        contactList({
          tempShow: false
        }).then(res=>{
          this.special = res.special;
          this.often = res.often;
          this.groups = res.groups;
          this.cellphone = res.cellphone;
          this.device = res.device;

          this.refreshStep = 3;
          setTimeout(()=>{
            this.$refs.touchmove && this.$refs.touchmove.reset();
          }, 500)
        })
      },

      onClick(dom){
        dom = isElement(dom, 'contact-item');
        if(!this.canClick){
          this.swipeActive = false;
          this.swipeTargetId = null;
          this.swipeTargetAcitiveId = null;
          this.canClick = true;
        }else if(dom){
          let id = dom.dataset.id;
          let type = dom.dataset.type;
          this.onChatClick(type, id)
        }
      },
      getItemMove(id){
        if(this.swipeTargetAcitiveId){
          return this.swipeTargetId == id ? -4*window.REM_SIZE : 0
        }else{
          return this.swipeTargetId == id ? this.itemX : 0
        }
      },
      onTouchTarget(target){
        this.swipeActive = false;
        let element = isElement(target, 'contact-item');
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
      onSetting(item){
        if(item.spe){
          item.spe = false;
          for(var i=0; i<this.special.length; i++){
            if(this.special[i].id == item.id){
              this.special.splice(i, 1);
              return;
            }
          }
        }else{
          item.spe = true;
          let titem = Object.assign({}, item);
          this.special.push(titem)
        }
      },
      onChatClick(type, id){
        if(type == 3){
          this.$emit('alert', {
            title: '',
            content: '跳转到设备模块',
            btns: ['确定']
          })
        }else{
          id && this.$router.push({
            name: 'zoo/other',
            params: {id}
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .home-contact-list{
    .msgs-search{
      background: @colorFFF;
    }
    .contact-list-tab{
      color: @color000;
      background: @colorFFF;
      padding-bottom: .4rem;
      .iconfont{
        font-size: 1.4rem;
        line-height: 1.5rem;
        &.icon-friendnew{
          color: #12b7f6;
        }
        &.icon-friendgroup{
          color: #4394f7;
        }
        &.icon-public{
          color: #ffa556;
        }
      }
    }
  }
</style>
