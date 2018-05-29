<template>
  <div class="friend-add has-header" :class="{'active': active}" v-show="isShow">
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick" >
      <div slot="left">取消</div>
      <div slot="title">添加好友</div>
      <div slot="right">发送</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <div class="bar"></div>
        <div class="flex content">
          <img class="headimg" :src="data.headimg" />
          <div class="flex-item">
            <div class="title text-over" v-text="data.title"></div>
            <div class="tip">{{data.sex==1?'男':'女'}} {{data.age}}岁 {{data.location}}</div>
          </div>
        </div>
        <div class="content content-v">
          <div class="tip">填写申请信息</div>
        </div>
        <div class="top-border">
          <cell>
            <div slot="input" class="content-v">
              <textarea v-model="value" rows="3" ></textarea>
            </div>
          </cell>
        </div>

        <div class="content content-v">
          <div class="tip">设置备注和分组</div>
        </div>

        <div class="top-border">
          <cell label="备注" >
            <my-input slot="input" v-model="desc"></my-input>
          </cell>
          <cell label="分组">
            <my-select slot="input" v-model="block.id" :list="block.list" title="移至分组"></my-select>
          </cell>
        </div>

        <div class="bar"></div>

        <div class="top-border bottom-border content content-v float-fixed bg-fff">
          <div class="col-black fl">不让TA看我的动态</div>
          <div class="fr">
            <my-switch v-model="seeme"></my-switch>
          </div>
        </div>

      </template>
    </touch-move>

    <toast-msg ref="toastmsg"></toast-msg>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import TouchMove from 'components/TouchMove';
  import Cell from 'components/Cell';
  import MyInput from 'components/MyInput';
  import MySwitch from 'components/MySwitch';
  import MySelect from 'components/MySelect';
  import ToastMsg from 'components/ToastMsg';

  import { FriendInfo, FriendSendInfo } from 'servers/API/friend';
  import { GroupList } from 'servers/API/contact';

  export default {
    components: {
      MyHeader,
      TouchMove,
      Cell,
      MyInput,
      MySwitch,
      MySelect,
      ToastMsg,
    },
    props: {},
    data() {
      return {
        value: '',
        desc: '',
        block: {id: '', label: '', list: []},
        seeme: false,
        data: {},
        active: false,
        isShow: false,
      }
    },
    mounted(){
      this.value = '我是'+ this.$store.getters.getUserInfo.nickname;
    },
    methods: {
      show(id){
        this.isShow = true
        FriendInfo(id).then(res=>{
          this.data = res;
          this.desc = res.title;
          this.active = true
        });
        GroupList({id: this.$store.getters.getUserInfo.id}).then(res=>{
          this.block.list = res;
          this.block.value = res.length > 0 ? res[0].id : '' ;
        })
      },
      hide(){
        this.active = false
        setTimeout(()=>{
          this.isShow = false
        }, 300)
      },
      send(){
        FriendSendInfo({
          id: this.data.id,
          name: this.desc,
          seeme: this.seeme,
          group: this.block.id,
          messge: this.value,
        }).then(res=>{
          this.$refs.toastmsg.show({
            status: 1,
            title: '请求已发送'
          })
        })
      },
      onLeftClick(){
        this.hide()
      },
      onRightClick(){
        this.send()
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .friend-add{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: @colorBgPage;
    transform: translate3d(0, 100%, 0);
    transition: transform .3s;
    &.active{
      transform: translate3d(0, 0, 0);
    }
    .headimg{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      margin-right: .4rem;
    }
    .title{
      padding: 0;
      text-align: left;
      color: @color000;
    }
  }
</style>
