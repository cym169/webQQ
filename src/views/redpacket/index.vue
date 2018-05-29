<template>
  <div v-title="'发红包'" class="redpacket-page container has-header ">
    <my-header @leftClick="onLeftClick" bgcol="#cf3a50">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title">发红包</div>
    </my-header>

    <div class="redpacket-nav inline-row text-center">
      <div class="item" :class="{'active':active == 0}" @click="onNavClick(0)">普通红包</div>
      <div class="item" :class="{'active':active == 1}" @click="onNavClick(1)">口令红包</div>
      <div class="nav-bar" :class="{'prev':active == 0, 'next':active == 1}" :style="swipemove2" ></div>
    </div>

    <touch-move :isswipe="true" @swipe="onSwipe" @swipemove="onSwipeMove">
      <template slot="content" >
        <div class="redpacket-cnt">
          <div class="redpacket-cnt-item" :class="{'prev': active == 1}" :style="active==0?swipemove:''">
            <cell label="金额" unit="元">
              <div class="text-right" slot="input">
                <my-input v-model="money" placeholder="输入金额" type="phone"></my-input>
              </div>
            </cell>
            <div class="bar"></div>
            <div class="content top-border bottom-border bg-fff">
              <my-input v-model="desc" placeholder="恭喜发财" type="text"></my-input>
            </div>

            <div class="content content-v">
              <div class="button" :class="{'disable': isMoney}" @click="onSubmit">塞钱<span v-if="money>0">{{money}}元</span></div>
            </div>
          </div>

          <div class="redpacket-cnt-item" :class="{'next': active == 0}" :style="active==1?swipemove:''">
            <cell label="设置口令" >
              <my-input slot="input" v-model="code" placeholder="如 “张三你好帅”" type="text"></my-input>
            </cell>
            <div class="content content-v">
              <div class="tip">小伙伴需回复口令抢红包</div>
            </div>
            <cell label="红包个数" unit="个">
              <div class="text-right" slot="input">
                <my-input v-model="count" placeholder="输入个数" type="phone"></my-input>
              </div>
            </cell>
            <cell label="总金额" unit="元">
              <div class="text-right" slot="input">
                <my-input v-model="money" placeholder="输入金额" type="phone"></my-input>
              </div>
            </cell>

            <div class="bar"></div>
            <div class="content content-v">
              <div class="button" :class="{'disable': isMoney}" @click="onSubmit">塞钱<span v-if="money>0">{{money}}元</span></div>
            </div>
          </div>
        </div>
      </template>
    </touch-move>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import TouchMove from 'components/TouchMove';
  import Cell from 'components/Cell';
  import MyInput from 'components/MyInput';
  import AutoTextarea from 'components/AutoTextarea';

  export default {
    components: {
      MyHeader,
      Alert,
      TouchMove,
      Cell,
      MyInput,
      AutoTextarea,
    },
    props: {},
    data() {
      return {
        active: 0,
        money: '',
        desc: '',
        code: '',
        count: '',
        touchmove: 0,
      }
    },
    watch: {
      desc(){
        if(this.desc.length > 20){
          this.desc = this.desc.substr(0, 20)
        }
      }
    },
    computed: {
      isMoney(){
        return !/^\d+(\.\d{1,3})*$/.test(this.money+'')
      },
      swipemove(){
        let tran = 'translate3d('+this.touchmove+'px,0,0)';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      },
      swipemove2(){
        let tran = 'translate3d('+this.touchmove*-1+'px,0,0)';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      },
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onNavClick(index){
        index != this.active && (this.active = index)
      },
      onSwipe(arrow){
        if(arrow == 'left'){
          this.active = 1
        }else if(arrow == 'right'){
          this.active = 0
        }
        this.touchmove = 0
      },
      onSwipeMove(m_x){
        this.touchmove = m_x
      },
      onSubmit(){
        if(!/^\d+(\.\d{1,3})?$/.test(this.money+'')){
          return false;
        }
        if(this.active == 0){
          this.$refs.alert.show({
            title: '',
            content: 'QQ钱包塞钱',
            btns: ['确定']
          })
        }else{
          if(!this.code){
            this.$refs.alert.show({
              content: '请输入口令',
              btns: ['确定']
            })
            return false;
          }
          if(!this.count){
            this.$refs.alert.show({
              content: '请输入个数',
              btns: ['确定']
            })
            return false;
          }
          this.$refs.alert.show({
            title: '',
            content: 'QQ钱包塞钱',
            btns: ['确定']
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .redpacket-page{
    background: #f7f0f2;
    .redpacket-nav{
      position: relative;
      background: #cf3a50;
      .item{
        width: 35%;
        color: #952438;
        padding: .4rem 0;
        &.active{
          color: #fbd49d;
        }
      }
      .nav-bar{
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 3rem;
        height: 3px;
        margin-left: -1.5rem;
        background: #fbd49d;
        transition: left .3s;
        &.prev{
          left: 32.5%;
        }
        &.next{
          left: 67.5%;
        }
      }
    }
    .redpacket-cnt{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .redpacket-cnt-item{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: transform .3s;
        &.prev{
          transform: translate3d(-100%, 0, 0)
        }
        &.next{
          transform: translate3d(100%, 0, 0)
        }
        .button{
          color: @colorFFF;
          background: #cf3a50;
          &.disable{
            opacity: .5;
          }
        }
        .text-right{
          padding-left: 5rem;
          input{
            text-align: right;
            padding-right: 5px;
          }
        }
      }
    }
  }
</style>
