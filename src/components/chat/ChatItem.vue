<template>
  <div class="chat-item" :class="{'mine': data.isme}">

    <img class="headimg" :src="data.headimg" />

    <div class="nickname" v-if="data.nickname">
      <span v-if="data.lvltxt" v-text="data.lvltxt" class="level" :class="'level-'+data.level"></span>
      <span v-text="data.nickname+':'"></span>
    </div>
    <div class="chat-item-cnt col-black">
      <img class="img" :src="data.img" v-if="data.img" @click="onImgClick"/>
      <img class="emoji" :src="data.emoji" v-if="data.emoji" />
      <p v-html="data.message" v-if="data.message"></p>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      data: Object,
    },
    data() {
      return {}
    },
    methods: {
      onImgClick(){
        this.$emit('imgclick')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .chat-item{
    position: relative;
    padding: .4rem 1.8rem;

    .headimg{
      position: absolute;
      top: .4rem;
      left: .2rem;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
    .nickname{
      font-size: 0;
      text-align: left;
      padding-bottom: .1rem;
      *{
        font-size: 12px;
        line-height: 13px;
        padding: 0 5px;
      }
      .level{
        color: @colorFFF;
        background: @colorMain;
        border-radius: 3px;
        &.level-1{
          background: @colorNormal;
        }
        &.level-2{
          background: @colorOk;
        }
        &.level-3{
          background: @colorWorning;
        }
        &.level-4{
          background: @colorError;
        }
      }
    }
    .chat-item-cnt{
      position: relative;
      display: inline-block;
      text-align: left;
      padding: .3rem;
      border-radius: .2rem;
      background: @colorFFF;
      min-height: .6rem;
      .img{
        height: 3rem;
      }
      .emoji{
         height: .9rem;
      }
    }
    .chat-item-cnt::before{
      content:'';
      position: absolute;
      top: 0;
      left: -.3rem;
      width: .4rem;
      height: .4rem;
      border-radius: 50%;
      box-shadow: .06rem .13rem 0 .06rem @colorFFF;
    }
    &.mine{
      text-align: right;
      .headimg{
        left: auto;
        right: .2rem;
      }
      .nickname{
        text-align: right;
      }
      .chat-item-cnt::before{
        left: auto;
        right: -.3rem;
        box-shadow: -.06rem .13rem 0 .06rem @colorFFF;
      }
    }
  }
</style>
