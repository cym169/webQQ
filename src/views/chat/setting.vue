<template>
  <div v-title="'聊天设置'" class="chat-setting-page container has-header " >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">聊天设置</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <div class="bar"></div>

        <router-link :to="{name:'zoo/other', params:{id}}" class="top-border" tag="div">
          <phone-item :data="info"></phone-item>
        </router-link>

        <div class="to-group-chat content content-v bottom-border flex" @click="onAlert('发起多人聊天')">
          <i class="iconfont icon-add1"></i>
          <div class="flex-item">发起多人聊天</div>
        </div>
        <div class="content-v"></div>

        <cell label="聊天记录" is-link @click="onAlert('聊天记录')">
          <div class="text-right tip" slot="input"><a>漫游7天</a></div>
        </cell>
        <cell label="聊天文件" is-link @click="onAlert('聊天文件')"></cell>
        <cell label="聊天背景" is-link @click="onAlert('聊天背景')"></cell>
        <cell label="特别关心" is-link @click="onAlert('特别关心')">
          <div class="text-right tip" slot="input">未启用</div>
        </cell>
        <cell label="屏蔽此人" >
          <div class="text-right" slot="input">
            <div class="blind-switch">
              <my-switch v-model="isBlind"></my-switch>
            </div>
          </div>
        </cell>

        <div class="content-v"></div>
        <div class="to-group-chat content content-v top-border bottom-border flex" @click="onAlert('添加桌面快捷方式')">
          <div class="flex-item">添加桌面快捷方式</div>
        </div>

        <div class="content-v"></div>
        <div class="content">
          <div class="button btn-error" @click="onDelClick">删除好友</div>
        </div>

        <div class="content content-v text-center">
          <a @click="onAlert('举报用户')">被骚扰了，举报该用户</a>
        </div>

      </template>
    </touch-move>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import TouchMove from 'components/TouchMove';
  import Cell from 'components/Cell';
  import MySwitch from 'components/MySwitch';
  import PhoneItem from 'components/message/PhoneItem';

  import { FriendInfo } from 'servers/API/friend'

  export default {
    components: {
      MyHeader,
      Alert,
      TouchMove,
      Cell,
      MySwitch,
      PhoneItem,
    },
    props: {},
    data() {
      return {
        id: this.$route.params.id,
        info: {
          icon: 'icon-arrowright',
          status: 1,
        },
        isBlind: false,
      }
    },
    mounted(){
      FriendInfo({id: this.id}).then(res=>{
        this.info = {
          title: res.nickname,
          icon: 'icon-arrowright',
          headimg: res.headimg,
          time: res.signature
        }
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onAlert(title){
        this.$refs.alert.show({
          title: '',
          content: '此处跳转'+title+'模块',
          btns: ['确定']
        })
      },
      onDelClick(){
        this.$refs.alert.show({
          title: '警告',
          content: '是否删除该好友',
          btns: ['取消', '确定'],
          callback: index=>{
            index == 1 && this.$refs.alert.show({
              title: '',
              content: '已删除该好友',
              btns: ['确定'],
              callback: index=>{
                this.$router.replace({
                  name: 'home'
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-setting-page{
    .to-group-chat{
      color: @colorSuccess;
      background: @colorFFF;
      .iconfont{
        font-size: .9rem;
        line-height: .7rem;
        margin: 0 1rem;
      }
    }
    .blind-switch{
      display: inline-block;
    }
  }

</style>
