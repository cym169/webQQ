<template>
    <div v-title="'登录'" class="login-page container text-center" >
      <div class="login-cnt flex" :class="{'active': !isWelcomeShow}" @click="onBodyClick">
        <div class="login-info">
          <img class="headimg" :src="headimg" />

          <div class="input-li input-account flex">
            <my-input type="phone" placeholder="输入账号" v-model="account" class="flex-item" @clear="onAccountClear"></my-input>
            <i class="iconfont icon-arrowdown" :class="{'active': isHistoryShow}" @click.stop="onAccountArrowClick"></i>
            <div class="input-accout-list" v-show="isHistoryShow">
              <account-items :items="accountItems" @account="onAccountClick" @delete="onDeleteClick"></account-items>
            </div>
          </div>
          <div class="input-li input-password">
            <my-input type="password" placeholder="输入密码" v-model="password" ></my-input>
          </div>

          <div class="content">
            <div class="button btn-success" :class="{'disable':!isAgree}" @click="onLogin">登&nbsp;&nbsp;录</div>

            <div class="float-fixed">
              <div class="fl">
                <a @click="onForgetPWClick">忘记密码？</a>
              </div>
              <div class="fr">
                <router-link :to="{name: 'check-phone',params: {type:'sign-new-user'}}" >新用户注册</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="readme inline-row text-center tip">
          <i class="item iconfont radio" :class="isAgree ? 'icon-success' : 'icon-null' " @click="onRadioReadme"></i>
          <span class="item" @click="onRadioReadme">我已阅读并同意 </span>
          <a class="item">服务条款</a>
        </div>

      </div>

      <div class="welcome" :class="{'active': isWelcomeShow}" :style="'background-image:url('+welcomeBg+')'" ></div>

      <confirm ref="confirm">
        <div slot="content" class="confirm-del-cnt">
          <div class="title">删除账号</div>
          <div>你确定删除QQ账号<span v-text="delAccount"></span>？</div>
          <div class="inline-row">
            <i class="item iconfont radio" :class="isDelHistory ? 'icon-success' : 'icon-null' " @click="onRadioHistory"></i>
            <span class="item" @click="onRadioHistory">删除相关聊天记录</span>
          </div>
        </div>
      </confirm>

      <alert ref="alert"></alert>

      <action-sheet ref="actionsheet" ></action-sheet>

    </div>
</template>

<script>
  import MyInput from 'components/MyInput';
  import Confirm from 'components/Confirm';
  import Alert from 'components/Alert';
  import ActionSheet from 'components/ActionSheet';
  import AccountItems from 'components/login/AccountList';

  import { AccountList, AccountHistory } from 'servers/global';
  import checkForm from 'utils/checks';
  import { loginIn } from 'servers/API/login';

  export default {
      components: {
        MyInput,
        AccountItems,
        Confirm,
        Alert,
        ActionSheet,
      },
      props:{},
      data() {
        return {
          isHistoryShow: false,
          isAgree: true,
          isWelcomeShow: true,
          welcomeBg: require('assets/images/login/start_0.jpg'),
          headimg: require('assets/images/common/headimg_def.jpg'),
          defimg: require('assets/images/common/headimg_def.jpg'),
          account: '',
          password: '',
          accountItems:[],
          delAccount: '',
          isDelAccount: false,
          isDelHistory: true,
        }
      },
      watch: {
        account(){
          let data = AccountHistory.get(this.account);
          this.headimg = data && data.userinfo && data.userinfo.headimg ? data.userinfo.headimg : this.defimg
        }
      },
      mounted(){
        this.accountItems = AccountList.get();
        let account = this.$route.query.account;
        if(account){
          this.account = account;
          this.isWelcomeShow = false
          return true;
        }
        setTimeout(()=>{
          this.isWelcomeShow = false
        }, 1000);

        if(this.accountItems.length>0){
          this.account = this.accountItems[0].account;
          this.password = this.accountItems[0].password;
          this.headimg = this.accountItems[0].headimg;
        }
      },
      methods: {
        onBodyClick(){
          this.isHistoryShow && ( this.isHistoryShow = false)
        },
        onAccountArrowClick(){
          this.isHistoryShow = !this.isHistoryShow
        },
        onAccountClear(){
          this.password = ''
        },
        onLogin(){
          if(!this.isAgree){
            return false;
          }
          if(!checkForm.isQQAccount(this.account)){
            this.$refs.alert.show({
              content:'请输入正确的QQ号'
            });
            return false;
          }
          if(!this.password){
            this.$refs.alert.show({
              content:'请输入密码'
            });
            return false;
          }
          loginIn({
            account: this.account,
            password: this.password,
          }).then(res=>{
            AccountList.add(this.account, this.password, res.nickname, res.headimg);
            AccountHistory.add(this.account, {userinfo: {headimg: this.headimg}, history:{}})
            this.$store.commit('update_userinfo', {
              account: res.account,
              nickname: res.nickname,
              headimg: res.headimg,
            })
            this.$router.replace({
              path: 'home/message/msgs'
            })
          });
        },
        onRadioReadme(){
          this.isAgree = !this.isAgree;
        },
        onAccountClick(index){
          let data = this.accountItems[index];
          this.account = data.account;
          this.password = data.password;
          this.isHistoryShow = false;
        },
        onDeleteClick(index){
          this.delAccount = this.accountItems[index].account;
          this.isHistoryShow = false;
          this.$refs.confirm.show({
            btns: ['取消', '删除'],
            callback: btn=>{
              if(btn == 1){
                AccountList.del(this.delAccount);
                if(this.isDelHistory){
                  AccountHistory.del(this.delAccount);
                }
                this.accountItems.splice(index, 1)
              }else{
                console.log('cancel delete this account')
              }
            }
          })
        },
        onRadioHistory(){
          this.isDelHistory = !this.isDelHistory;
        },
        onForgetPWClick(){
          this.$refs.actionsheet.show({
            btns: ['找回密码', '短信验证登录'],
            callback: index => {
              if(index == 0){
                this.$refs.alert.show({
                  content:'这是一个外部链接'
                })
              }else if(index == 1){
                this.$router.push({
                  name: 'check-phone',
                  params: {
                    type:'login-by-code'
                  }
                })
              }
            }
          })
        },
      }
  }
</script>

<style lang="less" >
  @import "../../assets/less/theme";

  .login-page {
    overflow: hidden;
    .headimg{
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-bottom: .6rem;
      margin-top: 2rem;
    }
    .input-li{
      position: relative;
      padding: 0 .4rem;
      background: @colorFFF;
    }
    .input-account{
      border-bottom: 1px solid @colorBorder;
    }
    .input-accout-list{
      position: absolute;
      left:0;
      top:100%;
      width:100%;
      z-index: 9;
    }
    .button{
      margin: .4rem 0;
      &.disable{
        color: @colorBorder;
      }
    }
    .icon-arrowdown{
      color: @colorCCC;
      display: block;
      transition: transform .3s;
      &.active{
        transform: rotate(180deg);
      }
    }
    .readme{
      margin-bottom: 1rem;
    }
    .login-cnt{
      position: relative;
      height: 100%;
      background: @colorBgPage;
      z-index: 2;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      transform: translate3d(100%, 0, 0);
      transition: transform .3s;
      .login-info{
        transform: translate3d(0, 100%, 0);
        transition: transform .5s;
      }
      &.active{
        transform: translate3d(0, 0, 0);
        .login-info{
          transform: translate3d(0, 0, 0);
        }
      }
    }
    .welcome{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-size: cover;
      z-index: 1;
      transform: translate3d(-100%, 0, 0);
      transition: transform .5s;
      &.active{
        transform: translate3d(0, 0, 0);
      }
    }
    .confirm-del-cnt{
      .inline-row{
        padding: .3rem 0;
      }
    }
  }
</style>
