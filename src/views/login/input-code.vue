<template>
    <div v-title="'输入短信验证码'" class="input-code has-header ">
      <myheader @leftClick="onLeftClick">
        <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
        <div slot="title">输入短信验证码</div>
      </myheader>

      <div class="content my-tip">
        <div class="tip">我们已给你的手机号码 <span class="warning" v-text="'+86 '+phone"></span> 发送了一条验证短信。</div>
      </div>

      <div class="phone-input flex">
        <div class="flex-item content">
          <my-input type="phone" v-model="code" placeholder="请输入短信验证码"></my-input>
        </div>
        <div class="content" :class="timedown>0 ? 'disable' : 'success'" @click="onSendCode">重新发送<span v-show="timedown>0" v-text="'('+timedown+'s)'"></span></div>
      </div>

      <div class="content">
        <div class="button" :class="isCode?'btn-success':'btn-disable'" @click="onNextClick">下一步</div>

        <div class="inline-row tip" >
          <i class="item iconfont radio" :class="isBind ? 'icon-success' : 'icon-null' " @click="onBindClick"></i>
          <span class="item" @click="onBindClick">将此手机号与QQ绑定，提高账号安全性。</span>
        </div>
        <div class="inline-row tip" >
          <i class="item iconfont radio" :class="isOpen ? 'icon-success' : 'icon-null' " @click="onOpenClick"></i>
          <span class="item" @click="onOpenClick">开启 <a>设备所</a> ，保障QQ账号安全。</span>
        </div>
      </div>

    </div>
</template>

<script>
    import Myheader from 'components/MyHeader';
    import MyInput from 'components/MyInput';

    import countdown from 'utils/countdown';
    import checkForm from 'utils/checks';
    import {sendCode, checkCode} from 'servers/API/login';

    export default {
        components: {
          Myheader,
          MyInput,
        },
        props: {},
        data() {
          return {
            type:'sign-new-user',
            phone:'',
            code:'',
            isCode: false,
            isBind: true,
            isOpen: true,
            timedown: 60,
          }
        },
        watch: {
          code(){
            this.isCode = checkForm.isCode(this.code)
          }
        },
        mounted(){
          this.phone = this.$route.params.phone;
          this.type = this.$route.params.type;
          countdown(60, count=>{
              this.timedown = count
          })
        },
        methods: {
          onBindClick(){
            this.isBind = !this.isBind
          },
          onOpenClick(){
            this.isOpen = !this.isOpen
          },
          onLeftClick(){
            this.$router.back();
          },
          onSendCode(){
            if(this.timedown <= 0){
              sendCode(this.phone).then(res=>{
                countdown(60, count=>{
                  this.timedown = count
                })
              })
            }
          },
          onNextClick(){
            if(!this.isCode){
                return ;
            }
            checkCode(this.code).then(res=>{
              if(this.type == 'sign-new-user') {
                this.$router.push({
                  name: 'phone-used',
                  params: {
                    phone: this.phone,
                  }
                })
              }
            })
          },
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .input-code{
    .my-tip{
      padding-top: .5rem;
    }
    .phone-input{
      background: @colorFFF;
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      margin: .6rem 0;
      .content{
        border-left: 1px solid @colorBorder;
        line-height: 1.4rem;
      }
      .flex-item{
        padding: 0 .2rem;
      }
    }
    .button{
      margin-bottom: .4rem;
    }
  }
</style>
