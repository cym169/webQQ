<template>
    <div v-title="'验证手机号码'" class="check-phone has-header ">
      <myheader @leftClick="onLeftClick">
        <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
        <div slot="title">验证手机号码</div>
      </myheader>

      <div class="phone-input flex">
        <div class="content">中国+86</div>
        <div class="flex-item content">
          <my-input type="phone" v-model="phone" placeholder="请输入你的手机号码"></my-input>
        </div>
      </div>

      <div class="content">
        <div class="button" :class="isPhone?'btn-success':'btn-disable'" @click="onNextClick">下一步</div>

        <div class="inline-row tip" v-if="type != 'login-by-code'">
          <i class="item iconfont radio" :class="isAgree ? 'icon-success' : 'icon-null' " @click="onRadioAgree"></i>
          <span class="item" @click="onRadioAgree">我已阅读并同意 <a>使用条款</a> 和 <a>隐私政策</a></span>
        </div>
      </div>

      <alert ref="alert"></alert>

    </div>
</template>

<script>
    import Myheader from 'components/MyHeader';
    import MyInput from 'components/MyInput';
    import Alert from 'components/Alert';

    import checkForm from 'utils/checks';
    import {sendCode} from 'servers/API/login';

    export default {
        components: {
          Myheader,
          MyInput,
          Alert,
        },
        props: {},
        data() {
          return {
            type:'login-by-code',
            phone:'',
            isPhone: false,
            isAgree: true,
          }
        },
        watch: {
          phone(){
            this.isPhone = this.isAgree && checkForm.isCellPhone(this.phone)
          }
        },
        mounted(){
          this.type = this.$route.params.type;
        },
        methods: {
          onLeftClick(){
            this.$router.back();
          },
          onRadioAgree(){
            this.isAgree = !this.isAgree;
            this.isPhone = this.isAgree && checkForm.isCellPhone(this.phone)
          },
          onNextClick(){
            if(!this.isPhone){
                return ;
            }
            sendCode(this.phone).then(res=>{
              if(this.type == 'login-by-code'){
                //toast正在发送短信
                this.$refs.alert.show({
                  title:'',
                  content:'请使用手机号码+密码进行登录。',
                  btns: ['我知道了']
                })
              }else if(this.type == 'sign-new-user')  {
                this.$router.push({
                  name: 'input-code',
                  params: {
                    phone: this.phone,
                    type: 'sign-new-user'
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
  .check-phone{
    .phone-input{
      background: @colorFFF;
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      margin: .6rem 0;
      .content{
        color: @colorSuccess;
        border-right: 1px solid @colorBorder;
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
