<template>
  <div class="zoo-comment mask " v-show="active" @click="onClose">
    <div class="zoo-comment-body content" @click.stop="">
      <div class="zoo-comment-btns flex">
        <div class="flex-item">
          <i class="iconfont icon-emoji" @click="onEmojiClick"></i>
          <i class="iconfont icon-at" @click="onAtClick"></i>
          <i class="iconfont icon-image" v-show="type==1" @click="onImageClick"></i>
        </div>
      </div>
      <div class="zoo-comment-edit flex">
        <div class="flex-item">
          <my-input v-model="value" type="text" :placeholder="type==1?'说点什么把':'转发理由'" ></my-input>
        </div>
        <div class="button btn-small" :class=" type==1&&value=='' ? 'btn-disable' : 'btn-success' " @click="onSendClick">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyInput from '../MyInput';

  export default {
    components: {
      MyInput,
    },
    props: {
      type: Number,//1-评论，2-转发
      active: Boolean,
    },
    data() {
      return {
        value: '',
      }
    },
    methods: {
      onEmojiClick(){
        this.$emit('alert', {
          title: '',
          content: '选择表情',
          btns: ['确定']
        })
      },
      onAtClick(){
        this.$emit('alert', {
          title: '',
          content: '选择@的人',
          btns: ['确定']
        })
      },
      onImageClick(){
        this.$emit('alert', {
          title: '',
          content: '选择图片',
          btns: ['确定']
        })
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
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .zoo-comment-body{
    position: absolute;
    left:0;
    bottom:0;
    right:0;
    background: #ebecee;
    border-top: 1px solid @color777;
    .zoo-comment-btns{
      padding: .3rem 0;
      .iconfont{
        font-size: .9rem;
        line-height: 1rem;
        margin-right: .3rem;
        &.icon-delete{
          margin-right: 0;
        }
      }
    }
    .zoo-comment-edit{
      padding-bottom: .4rem;
      & > .flex-item{
        border: 1px solid @colorBorder;
        border-radius: 5px;
        margin-right: 5px;
        overflow: hidden;
      }
      .my-input{
        height: 1rem;
      }
      .my-input input{
        line-height: 1rem;
      }
      .button{
        line-height: 1rem;
      }
      .btn-disable{
        border: 1px solid @colorBorder;
      }
    }
  }
</style>
