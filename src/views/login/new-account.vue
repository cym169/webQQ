<template>
    <div v-title="'设置资料'" class="new-account has-header ">
      <myheader @leftClick="onLeftClick">
        <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
        <div slot="title">设置资料</div>
      </myheader>

      <div class="phone-input ">
        <div class="flex">
          <div class="content">昵称</div>
          <div class="flex-item content">
            <my-input type="text" v-model="nickname" ></my-input>
          </div>
        </div>
        <div class="flex">
          <div class="content">密码</div>
          <div class="flex-item content">
            <my-password v-model="password" ></my-password>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="tip">
          密码由6-16数字、字母或符号组成，不能是9位以下纯数字。
        </div>

        <div class="button" :class="isRight?'btn-success':'btn-disable'" @click="onNextClick">注册</div>

      </div>

      <alert ref="alert"></alert>

    </div>
</template>

<script>
    import Myheader from 'components/MyHeader';
    import MyInput from 'components/MyInput';
    import MyPassword from 'components/MyPassword';
    import Alert from 'components/Alert';

    import checkForm from 'utils/checks';
    import {signNewAccount} from 'servers/API/login';

    export default {
        components: {
          Myheader,
          MyInput,
          MyPassword,
          Alert,
        },
        props: {},
        data() {
          return {
            nickname: '',
            password: '',
            isRight: false,
          }
        },
        watch: {
          nickname(){
            this.isRight = this.nickname && checkForm.isPassword(this.password)
          },
          password(){
            this.isRight = this.nickname && checkForm.isPassword(this.password)
          }
        },
        mounted(){
          this.phone = this.$route.params.phone;
        },
        methods: {
          onLeftClick(){
            this.$router.back();
          },
          onNextClick(){
            if(!this.isRight){
                return ;
            }
            signNewAccount({
                phone: this.phone == 'null' ? null : this.phone,
                nickname: this.nickname,
                password: this.password,
            }).then(res=>{
                this.$router.push({
                  name: 'sign-success',
                  params: {
                    account: res.account
                  }
                })
            })
          },
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .new-account{
    .phone-input{
      background: @colorFFF;
      border-top: 1px solid @colorBorder;
      border-bottom: 1px solid @colorBorder;
      margin: .6rem 0;
      .content{
        line-height: 1.4rem;
      }
      .flex-item{
        padding: 0 .2rem;
      }
      &>.flex:first-child{
        border-bottom: 1px solid @colorBorder;
      }
    }
    .button{
      margin-top: .4rem;
    }
  }
</style>

