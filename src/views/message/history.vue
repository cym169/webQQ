<template>
  <div v-title="'通话详情'" class="phone-history-page container has-header " >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">通话详情</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <router-link :to="{name:'zoo/other', params:{id: info.id}}" tag="div" class="flex content content-v bg-fff bottom-border" >
          <img class="headimg" :src="info.headimg" />
          <div class="flex-item text-over" v-text="info.title"></div>
          <div class="tip" v-if="info.count" v-text="'('+info.count+')'"></div>
          <i class="iconfont icon-arrowright"></i>
        </router-link>

        <div class="float-fixed content content-v bg-fff">
          <div class="fl tip">通话历史</div>
          <div class="fr success" @click="onAlert('清空通话记录')">清理全部</div>
        </div>

        <phone-history-item v-for="item in items" :data="item"></phone-history-item>

      </template>

    </touch-move>

    <div class="zoo-other-btns inline-row content-v text-center">
      <div class="item button btn-normal" @click="onPhoneClick">QQ电话</div>
      <div class="item button btn-success" @click="onMsgClick">发消息</div>
    </div>

    <alert ref="alert"></alert>

  </div>

</template>

<script>
  import MyHeader from 'components/MyHeader'
  import TouchMove from 'components/TouchMove'
  import Alert from 'components/Alert'
  import PhoneHistoryItem from 'components/Message/PhoneHistoryItem';

  import { phoneHistory } from 'servers/API/message'

  export default {
    components: {
      MyHeader,
      TouchMove,
      Alert,
      PhoneHistoryItem,
    },
    props: {},
    data() {
      return {
        info: {},
        items: [],
      }
    },
    mounted(){
      phoneHistory({id: this.$route.params.id}).then(res=>{
        this.info = res.info;
        this.info.id = this.$route.params.id;
        this.items = res.items;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onPhoneClick(){
        this.onAlert('调用语音电话')
      },
      onMsgClick(){
        this.$router.push({
          name: 'chat',
          params: {
            id: this.info.id,
            type: this.info.count>1?2:1
          }
        })
      },
      onAlert(title){
        this.$refs.alert.show({
          title: '',
          content: title,
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .phone-history-page{
    padding-bottom: 2rem;
    .headimg{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: .2rem;
    }
    .zoo-other-btns{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      .button{
        width: 40%;
        margin: 0 .2rem;
      }
    }
  }
</style>
