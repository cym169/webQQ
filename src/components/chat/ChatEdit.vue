<template>
  <div class="chat-edit">
    <div class="chat-edit-input flex content">
      <div class="flex-item cnt">
        <auto-textarea v-model="message" ></auto-textarea>
      </div>
      <div class="button btn-small" :class="message ? 'btn-success': 'btn-disable'" @click="onSendClick">发送</div>
    </div>
    <div class="chat-edit-btns inline-row">
      <i class="item iconfont icon-mic" :class="{'active': active=='mic'}" @click="onBtnClick('mic')"></i>
      <i class="item iconfont icon-picture" :class="{'active': active=='pic'}" @click="onBtnClick('pic')"></i>
      <i class="item iconfont icon-video" :class="{'active': active=='video'}" @click="onBtnClick('video')"></i>
      <i class="item iconfont icon-camera" :class="{'active': active=='camera'}" @click="onBtnClick('camera')"></i>
      <i class="item iconfont icon-redpacket" :class="{'active': active=='redpacket'}" @click="onBtnClick('redpacket')"></i>
      <i class="item iconfont icon-emoji" :class="{'active': active=='emoji'}" @click="onBtnClick('emoji')"></i>
      <i class="item iconfont icon-add1" :class="{'active': active=='more'}" @click="onBtnClick('more')"></i>
    </div>

    <div class="chat-edit-more" v-show="active">
      <chat-edit-mic @send="onSend" v-show="active=='mic'" @alert="onAlert"></chat-edit-mic>
      <chat-edit-pic @send="onSend" v-show="active=='pic'" @alert="onAlert"></chat-edit-pic>
      <chat-edit-emoji @send="onSend" v-show="active=='emoji'" @alert="onAlert"></chat-edit-emoji>
      <chat-edit-more @send="onSend" v-show="active=='more'" @alert="onAlert"></chat-edit-more>
    </div>
  </div>
</template>

<script>
  import AutoTextarea from 'components/AutoTextarea';
  import ChatEditMic from './ChatEditMic';
  import ChatEditPic from './ChatEditPic';
  import ChatEditEmoji from './ChatEditEmoji';
  import ChatEditMore from './ChatEditMore';

  import { getCamera } from 'servers/CordovaAPI';

  export default {
    components: {
      AutoTextarea,
      ChatEditMic,
      ChatEditPic,
      ChatEditEmoji,
      ChatEditMore,
    },
    props: {},
    data() {
      return {
        message: '',
        active: '',
      }
    },
    methods: {
      onBtnClick(type){
        if(type == this.active){
          this.active = '';
          this.$emit('more', false)
          return true;
        }
        if(type == 'video'){
          this.$emit('alert', {
            title: '',
            content: '此处调用手机拍摄视频',
            btns: ['确定']
          })
        }else if(type == 'camera'){
          getCamera((value, msg) => {
            if(!value){
              this.$emit('alert', {
                title: '',
                content: msg,
                btns: ['确定']
              })
            }else{
              this.onSend({
                type: 'imgs',
                message: [value]
              })
            }
          })
        }else if(type == 'redpacket'){
          this.$router.push({
            name: 'redpacket'
          })
        }else{
          this.active = type;
          this.$emit('more', true)
        }
      },
      onSendClick(){
        if(!this.message){return true;}
        this.$emit('send', {
          type: 'text',
          message: this.message.replace(/\n/ig, '<br/>'),
        })
        this.message = ''
      },
      onSend(params){
        this.$emit('send', params)
      },
      onAlert(option){
        this.$emit('alert', option)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-edit{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 2.4rem;
    background: #ecedf1;
    .chat-edit-input{
      padding-top: .2rem;
      align-items: flex-start;
      > .cnt{
        color: @color000;
        background: @colorFFF;
        border-radius: 3px;
        padding: 2px 10px;
      }
      .button{
        margin-left: .1rem;
        &.btn-disable{
          background: #dddee2;
        }
      }
    }
    .chat-edit-more{
      height: 5rem;
      background: @colorFFF;
    }
    .chat-edit-btns{
      font-size: 0;
      .iconfont{
        font-size: .9rem;
        line-height: 1.2rem;
        margin: 0 .4rem;
        &.active{
          color: @colorSuccess;
        }
      }
    }
  }
</style>
