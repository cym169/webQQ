<template>
  <div v-title="'注册新QQ号'" class="phone-used has-header ">
    <myheader @leftClick="onLeftClick">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title">注册新QQ号</div>
    </myheader>

    <div class="phone-used-cnt content text-center">
      <div class="used-list" v-if="items.length > 0">
        <div class="title">该手机号码被以下QQ号绑定：</div>
        <template v-for="item in items">
          <img class="headimg" :src="item.headimg" />
          <div class="title title-account" v-text="item.nickname"></div>
          <div class="tip tip-account" >
            <i class="iconfont icon-qq"></i>
            <span v-text="hideAccount(item.account)"></span>
          </div>
          <div class="tip">你可能忘记了该QQ号，现在可以</div>
          <div class="button btn-success" @click="onLoginAccount(item.account)">直接登录{{hideAccount(item.account)}}</div>
        </template>
        <div class="divider">或</div>
        <div class="button btn-normal" @click="onContinue">继续注册新QQ号</div>
      </div>
    </div>

    <alert ref="alert"></alert>
  </div>
</template>

<script>
  import Myheader from 'components/MyHeader';
  import Alert from 'components/Alert';

  import {getPhoneAccount} from 'servers/API/login';

  export default {
    components: {
      Myheader,
      Alert,
    },
    props: {},
    data() {
      return {
        phone: '',
        items:[],
      }
    },
    mounted(){
      this.phone = this.$route.params.phone;
      getPhoneAccount(this.phone).then(res=>{
        if(res.length == 0){
          this.onContinue()
        }else{
          this.items = res;
        }
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      hideAccount(account){
        return account.substr(0, 2)+'*****'+account.substr(-2)
      },
      onLoginAccount(account){
        this.$router.push({
          path: '/login?account='+account
        })
      },
      onContinue(){
        if(this.items.length > 0){
          this.$refs.alert.show({
            title:'',
            content: `将手机号${this.phone}绑定新QQ号，会接触与原QQ号的绑定，是否绑定？`,
            btns: ['绑定新QQ号', '不绑定', '取消'],
            callback: index=>{
              if(index == 0){
                this.$router.push({
                  name: 'new-account',
                  params: {
                    phone: this.phone
                  }
                })
              }else if(index == 1){
                this.$router.push({
                  name: 'new-account',
                  params: {
                    phone: 'null'
                  }
                })
              }
            }
          })
        }
      }
    }
  }

</script>

<style lang="less">
  @import "../../assets/less/theme";
  .phone-used{
    .phone-used-cnt{
      padding: 1rem 2rem;
    }
    .used-list{
      .title{
        color: @color000;
      }
      .headimg{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-bottom: .5rem;
        margin-top: .5rem;
      }
      .title-account{
        padding: 0;
      }
      .tip-account{
        margin-bottom: .8rem;
      }
      .divider{
        margin: .5rem 0
      }
      .button{
        margin: .2rem 0;
      }
    }
  }
</style>
