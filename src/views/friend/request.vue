add.vue<template>
  <div v-title="'好友申请'" class="friend-request container has-header " >
    <my-header @leftClick="onLeftClick" >
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">好友申请</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <div class="content content-v flex top-border" @click="onZooClick">
          <img class="headimg" :src="data.headimg" />
          <div class="flex-item content">
            <div class="title text-over" v-text="data.title"></div>
            <div class="tip">
              <span v-text="data.sex==1?'男':'女'"></span>
              <span v-text="data.age+'岁'"></span>
            </div>
          </div>
          <i class="iconfont icon-arrowright"></i>
        </div>

        <div class="content content-v flex top-border">
          <div class="label tip">附加消息</div>
          <div class="flex-item title text-over" v-text="data.tip"></div>
          <div class="button btn-small btn-normal" v-if="data.sta != -1" @click="onBackClick">回复</div>
        </div>

        <div class="content content-v flex top-border">
          <div class="label tip">来源</div>
          <div class="flex-item title text-over" v-text="data.from"></div>
        </div>

        <div class="flex content-v" v-if="data.sta == 0">
          <div class="flex-item content">
            <div class="button btn-normal" @click="onStaClick(false)">拒绝</div>
          </div>
          <div class="flex-item content">
            <div class="button btn-success" @click="onStaClick(true)">同意</div>
          </div>
        </div>

        <div class="content-v text-center" v-if="data.sta == 1">
          <div class="tip">已同意该申请</div>
        </div>
        <div class="content-v text-center" v-if="data.sta == -1">
          <div class="tip">已忽略该申请</div>
        </div>

      </template>
    </touch-move>

    <div class="other-link flex">
      <div @click="onOtherClick('设为黑名单')">设为黑名单</div>
      <div class="line"></div>
      <div @click="onOtherClick('举报用户')">举报用户</div>
    </div>

    <toast-msg ref="toastmsg"></toast-msg>
    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import ToastMsg from 'components/ToastMsg';
  import Alert from 'components/Alert';

  import { FriendRequest } from 'servers/API/friend';

  export default {
    components: {
      TouchMove,
      MyHeader,
      ToastMsg,
      Alert,
    },
    props: {},
    data(){
      return {
        data: {
          id: 0,
          title: '',
          headimg: '',
          sex: 1,
          age: 26,
          tip: '',
          from : '',
          sta: 1,//1-通过，0-未通过，-1-拒绝
        }
      }
    },
    mounted(){
      FriendRequest(this.$route.params.id).then(res=>{
        this.data = res
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onZooClick(){
        this.$router.push({
          name: 'zoo/other',
          params: {
            id: this.data.id
          }
        })
      },
      onBackClick(){
        this.$router.push({
          name: 'chat',
          params: {
            id: this.data.id
          }
        })
      },
      onStaClick(flag){
        this.data.sta = flag ? 1 : -1;
        this.$refs.toastmsg.show({
          status: flag ? 1 : 0,
          title: flag ? '已同意该请求' : '已拒绝该请求'
        })
      },
      onOtherClick(title){
        this.$refs.alert.show({
          title: '',
          content: '跳转到"'+title+'"业务模块',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .friend-request{
    .top-border{
      background: @colorFFF;
    }
    .headimg{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
    .label{
      width: 2.3rem;
      font-size: .5rem;
    }
    .title{
      padding: 0;
      text-align: left;
      color: @color000;
    }
    .other-link{
      color: @colorSuccess;
      position: absolute;
      left: 0;
      bottom: .5rem;
      width: 100%;
      .line{
        width: 2px;
        background: @colorSuccess;
        height: .5rem;
        margin: 0 .4rem;
      }
    }
  }
</style>
