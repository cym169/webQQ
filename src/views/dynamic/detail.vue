<template>
  <div v-title="data.title" class="dynamic-detail has-header container"
       @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
    </my-header>

    <div class="detail-content" >
      <div class="top-icon text-center" :style="getTopStyle">
        <div class="icon" :style="getIconStyle">
          <i class="iconfont flex" :class="data.icon" :style="'background-color:'+data.iconcolor" ></i>
        </div>
        <div class="title" v-text="data.title" :style="getTitleStyle"></div>
      </div>
      <div class="content content-v" v-text="data.desc"></div>
    </div>

    <div class="detail-btn content content-v">
      <div class="button btn-error" v-if="open" @click="onCloseClick">关闭</div>
      <div class="button btn-success" v-if="!open" @click="onOpenClick">开启</div>
    </div>

    <alert ref="alert"></alert>

    <toast-msg ref="toastmsg"></toast-msg>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import ToastMsg from 'components/ToastMsg';

  export default {
    components: {
      TouchMove,
      MyHeader,
      Alert,
      ToastMsg,
    },
    props: {},
    data() {
      return {
        data: {},
        open: true,
        startY: 0,
        startScale: 1,
        currentScale: 1,
      }
    },
    computed: {
      getTopStyle(){
        return 'height:'+this.currentScale*5+'rem'
      },
      getIconStyle(){
        let scale = this.currentScale*.6+.4;
        let move = (1-this.currentScale)*-1.8;
        let padding = '';
        if(this.currentScale<.1){
          let p = (.1-this.currentScale)*40+'%'
          padding = 'padding-left:'+p+';padding-right:'+p
        }
        return 'transform:translate3d(0,'+move+'rem,0) scale('+scale+','+scale+');'+'-webkit-transform:translate3d(0,'+move+'rem,0) scale('+scale+','+scale+');'+padding
      },
      getTitleStyle(){
        let move = (1-this.currentScale)*-3;
        return 'transform:translate3d(0,'+move+'rem,0);'+'-webkit-transform:translate3d(0,'+move+'rem,0);opacity:'+this.currentScale;
      },
    },
    mounted(){
      this.data = this.$route.params;
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onCloseClick(){
        this.$refs.alert.show({
          title: '',
          content: '关闭"'+this.data.title+'"后将不能在"动态"中收到最新的消息及提醒',
          btns: ['先留着吧', '仍然关闭'],
          callback: index=>{
            index == 1 && (
              this.$refs.toastmsg.show({
                status: 1,
                title: '成功关闭'+this.data.title
              }),
              this.open = false
            )
          }
        })
      },
      onOpenClick(){
        this.$refs.alert.show({
          title: '',
          content: '开启后和直接在动态中进入'+this.data.title,
          btns: ['取消', '开启'],
          callback: index=>{
            index == 1 && (
              this.$refs.toastmsg.show({
                status: 1,
                title: '成功开启'+this.data.title
              }),
              this.open = true
            )
          }
        })
      },
      onTouchStart(event){
        this.startY = event.touches[0].clientY;
        this.startScale = this.currentScale;
      },
      onTouchMove(event){
        let move = event.touches[0].clientY-this.startY;
        this.currentScale = this.startScale + move/200
        this.currentScale > 1 && (this.currentScale = 1)
        this.currentScale < 0 && (this.currentScale = 0)
      },
      onTouchEnd(){
        this.startY = 0;
        this.startScale = this.currentScale;
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .dynamic-detail{
    .detail-content{
      position: relative;
      z-index: 999;
      .content{
        color: @color000;
      }
      .top-icon{
        color: @colorFFF;
        background: @colorSuccess;
        height: 5rem;
        .icon{
          display: inline-block;
          width: 2rem;
          height: 2rem;
          padding: 1%;
          border-radius: 50%;
          background: rgba(255,255,255,.2);
          .iconfont{
            font-size: 1.6rem;
            line-height: 100%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .detail-btn{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
