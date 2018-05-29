<template>
  <div class="zoo-redpacket content mask flex text-center" v-show="active">
    <div class="zoo-redpacket-box">
      <i class="iconfont icon-delete" @click="onClose"></i>
      <img class="redpacket-headimg col-fff" :src="data.headimg" />
      <div class="redpacket-nickname" v-text="data.title || '123'"></div>
      <div class="redpacket-input">
        <input type="number" v-model="value" :disabled="!edit" />
        <span>元</span>
      </div>
      <span class="redpacket-change" @click="onChangeClick">{{!edit?'修改金额':'取消'}}</span>
      <div class="button " @click="onSure">赏红包</div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    props: {
      data: Object,
      active: Boolean,
    },
    data() {
      return {
        value: '',
        lastV: '',
        edit: false,
      }
    },
    watch: {
      active(newV){
        newV && this.randomMoney()
      }
    },
    methods: {
      randomMoney(){
        this.value = (Math.random()).toFixed(2)
      },
      onChangeClick(){
        this.edit = !this.edit
        if(this.edit) {
          this.lastV = this.value + '';
          this.value = ''
        }else{
          this.value = this.lastV
        }
      },
      onSendClick(){
        if(this.type==1 && this.value==''){
          return
        }else{
          this.$emit('send', this.value);
          this.value = '';
        }
      },
      onClose(){
        this.$emit('close')
      },
      onSure(){
        this.$emit('close')
        this.$emit('send', this.value)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .zoo-redpacket-box{
    position: relative;
    padding: .6rem .4rem;
    width: 7rem;
    border-radius: 10px;
    background: #eb4455;
    animation: scaleIn .3s both;
    .redpacket-headimg{
      position: absolute;
      left: 50%;
      top: -1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-left: -1rem;
    }
    .icon-delete{
      position: absolute;
      top: .2rem;
      right: .2rem;
      color: #962438;
      font-size: .7rem;
      width: .7rem;
      line-height: .7rem;
    }
    .redpacket-nickname{
      padding: .6rem 0;
      color: @colorFFF;
    }
    .redpacket-input{
      input{
        width: 2rem;
        background: transparent;
        font-size: 1.5rem;
        color: #f1bc78;
        text-align: right;
      }
      span{
        color: #f1bc78;
      }
    }
    .redpacket-change{
      font-size: .3rem;
      color: #f1bc78;
    }
    .button{
      margin-top: .5rem;
      color: #eb4455;
      background: #f1bc78;
    }
  }
</style>
