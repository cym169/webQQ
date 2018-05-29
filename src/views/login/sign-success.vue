<template>
    <div v-title="'注册成功'" class="sign-success has-header ">
      <myheader @leftClick="onLeftClick">
        <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
        <div slot="title">注册成功</div>
      </myheader>

      <img class="img-100" :src="img" />
      <div class="content text-center">
        <div>你的QQ号为：</div>
        <div class="title warning" v-text="account"></div>
        <div class="button btn-success" @click="onLoginClick">登陆</div>
        <div class="tip">3天内未登录，该QQ号将被收回。</div>
      </div>

    </div>
</template>

<script>
    import Myheader from 'components/MyHeader';

    import { loginIn } from 'servers/API/login';

    export default {
        components: {
          Myheader,
        },
        props: {},
        data() {
          return {
            img: require('assets/images/login/sign_success.jpg'),
            account: '',
          }
        },
        mounted(){
          this.account = this.$route.params.account;
        },
        methods: {
          onLeftClick(){
            this.$router.back();
          },
          onLoginClick(){
            loginIn({
                account: this.account,
                isnew: true,
            }).then(res=>{
                this.$store.commit('update_userinfo', {
                    account: res.account,
                    nickname: res.nickname,
                    headimg: res.headimg,
                })
                this.$router.replace({
                  path: 'home/message/msgs'
                })
            })
          },
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .sign-success{
    img{
      margin-bottom: .3rem;
    }
    .title{
      font-size: .9rem;
      margin-bottom: .6rem;
    }
    .button{
      margin: .2rem 1.6rem;
    }

  }
</style>

