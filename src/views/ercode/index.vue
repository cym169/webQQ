<template>
    <div v-title="'我的二维码'" class="ercode-page has-header ">
      <my-header @leftClick="onLeftClick">
        <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
        <div slot="title">我的二维码</div>
      </my-header>

      <div class="ercode-info" @click="onInfoClick">
        <img class="img-100" :src="getUserinfo.ercode" />
        <div class="flex content content-v">
          <img class="headimg" :src="getUserinfo.headimg" />
          <div class="flex-item">
            <div class="title text-over" v-text="getUserinfo.nickname"></div>
            <div class="tip text-over">扫一扫二维码，加我QQ</div>
          </div>
        </div>
      </div>

      <div class="ercode-btns flex text-center">
        <div class="flex-item" @click="onItemClick('收钱')">
          <div class="btn-icon i-takemoney">
            <i class="iconfont icon-takemoney"></i>
          </div>
          <div>收钱</div>
        </div>
        <div class="flex-item" @click="onItemClick('付款码')">
          <div class="btn-icon i-barcode">
            <i class="iconfont icon-barcode"></i>
          </div>
          <div>付款码</div>
        </div>
        <div class="flex-item" @click="onItemClick('扫一扫')">
          <div class="btn-icon i-scan">
            <i class="iconfont icon-scan"></i>
          </div>
          <div>扫一扫</div>
        </div>
      </div>

      <alert ref="alert"></alert>

      <action-sheet ref="actionsheet"></action-sheet>

    </div>
</template>

<script>
    import MyHeader from 'components/MyHeader';
    import Alert from 'components/Alert';
    import ActionSheet from 'components/ActionSheet';

    export default {
        components: {
          MyHeader,
          Alert,
          ActionSheet,
        },
        props: {},
        data() {
          return {
          }
        },
        computed: {
          getUserinfo(){
            let {nickname, headimg, ercode} = this.$store.getters.getUserInfo;
            return {nickname, headimg, ercode}
          },
        },
        methods: {
          onLeftClick(){
            this.$router.back();
          },
          onItemClick(title){
            this.$refs.alert.show({
              title: '',
              content:'此处应跳转到 '+title+' 的内容',
              btns: ['取消']
            })
          },
          onInfoClick(){
            this.$refs.actionsheet.show({
              btns: ['分享到空间', '换个样式', '保存到手机'],
              callback: index=>{
                let title = '';
                switch (index) {
                  case 0: title='分享到空间';break;
                  case 1: title='换个样式';break;
                  case 2: title='保存到手机';break;
                }
                title && this.$refs.alert.show({
                  title: '',
                  content:'此处为 '+title+' 功能',
                  btns: ['取消']
                })
              }
            })
          }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .ercode-page{
    .ercode-info{
      margin: .5rem 1rem;
      padding: 1px;
      border: 1px solid @colorBorder;
      .headimg{
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        margin-right: .4rem;
      }
      .title{
        text-align: left;
        color: @color000;
        padding: 0;
      }
      .content{
        background: @colorF3;
      }
    }
    .ercode-btns{
      margin-top: 1rem;
      .btn-icon{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 10px;
        color: @colorFFF;
        margin-bottom: .2rem;
        .iconfont{
          font-size: 1rem;
          line-height: 1.5rem;
        }
        &.i-takemoney{
          background: #5394ef;
        }
        &.i-barcode{
          background: #12b7f6;
        }
        &.i-scan{
          background: #12b7f6;
        }
      }
    }
  }
</style>
