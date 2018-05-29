<template>
  <touch-move class="chat-body page" ref="touchmove" :refresh="true"
                @refresh="onRefresh" >
    <div slot="refresh" class="flex content-v">
      <i class="icon-loading"></i>
      <div class="content">正在加载...</div>
    </div>
    <template slot="content">

      <chat-item v-for="(item, index) in items" :data="item" @imgclick="onImgClick(index)"></chat-item>

    </template>
  </touch-move>
</template>

<script>
  import ChatItem from './ChatItem';
  import TouchMove from 'components/TouchMove';

  export default {
    components: {
      TouchMove,
      ChatItem,
    },
    props: {
      items: Array,
      type: {
        type: String,
        default: '1',
      },
    },
    data() {
      return {}
    },
    methods: {
      moveToTop(){
        this.$refs.touchmove.moveToTop()
      },
      moveToEnd(){
        this.$refs.touchmove.moveToEnd()
      },
      onRefresh(){
        this.$emit('loading')
      },
      reset(){
        setTimeout(()=>{
          this.$refs.touchmove && this.$refs.touchmove.reset();
        }, 500)
      },
      onImgClick(index){
        this.$emit('imgclick', index)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .chat-body{
    background: #ecedf1;
    .icon-loading + div{
      font-size: .3rem;
      color: @colorBBB;
    }
  }
</style>
