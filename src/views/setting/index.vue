<template>
  <div v-title="'设置'" class="setting-page container has-header " >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">设置</div>
    </my-header>

    <touch-move>
      <template slot="content">

        <div class="bar bottom-border"></div>
        <cell longLabel isLink label="账号管理" @click="onAlert('账号管理')">
          <div slot="input" class="text-right fontsize0">
            <img class="headimg" :src="myinfo.headimg" />
          </div>
        </cell>
        <cell longLabel isLink label="手机号码" @click="onAlert('手机号码')">
          <div slot="input" class="text-right fontsize0">
            <span class="tip" v-text="myinfo.cellphone" ></span>
          </div>
        </cell>
        <cell longLabel isLink label="QQ达人" @click="onAlert('QQ达人')">
          <div slot="input" class="text-right fontsize0">
            <span class="tip warning" v-text="myinfo.drdays+'天'" ></span>
          </div>
        </cell>

        <div class="bar bottom-border"></div>
        <cell longLabel isLink label="消息通知" @click="onAlert('消息通知')"></cell>
        <cell longLabel isLink label="聊天记录" @click="onAlert('聊天记录')"></cell>
        <cell longLabel isLink label="空间清理" @click="onAlert('空间清理')"></cell>

        <div class="bar bottom-border"></div>
        <cell longLabel isLink label="账号、设备安全" @click="onAlert('账号、设备安全')"></cell>
        <cell longLabel isLink label="联系人、隐私" @click="onAlert('联系人、隐私')"></cell>
        <cell longLabel isLink label="辅助功能" @click="onAlert('辅助功能')"></cell>

        <div class="bar bottom-border"></div>
        <cell longLabel isLink label="退出登录" @click="onLoginOut"></cell>
        <div class="bar"></div>

        <div class="bar bottom-border"></div>
        <cell longLabel isLink label="关于QQ与帮助" @click="onAlert('关于QQ与帮助')"></cell>
        <div class="bar"></div>

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

  export default {
    components: {
      MyHeader,
      Alert,
      TouchMove,
      Cell,
    },
    props: {},
    data() {
      return {
        myinfo: {
          headimg: '',
          cellphone: '',
          drdays: 0,
        }
      }
    },
    mounted(){
      this.myinfo.headimg = this.$store.getters.getUserInfo.headimg;
      this.myinfo.cellphone = '158****0737';
      this.myinfo.drdays = 965;
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
      onLoginOut(){
        this.$refs.alert.show({
          title: '注意',
          content: '确定要退出当前账号吗？',
          callback: index => {
            index == 1 && this.$router.replace({
              name: 'login'
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .setting-page{
    .fontsize0{
      font-size: 0;
    }
    .headimg{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }
</style>
