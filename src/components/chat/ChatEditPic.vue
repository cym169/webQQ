<template>
  <div class="chat-edit-pic">
    <div class="edit-pic-imgs inline-row">
      <div class="item" :class="{'active': item.active}" v-for="(item, index) in items" @click="onItemClick(index)">
        <img :src="item.src" />
      </div>
    </div>
    <div class="edit-pic-opt flex ">
      <div class="active">相册</div>
      <div :class="{'active': count}">编辑</div>
      <label class="inline-row">
        <input class="item" type="checkbox" />
        <span class="item">原图</span>
      </label>
      <div class="flex-item text-right">
        <div class="button btn-small" :class="count ? 'btn-success': 'btn-disable'" @click="onClick">发送{{count ? '('+count+')' : ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {},
    data() {
      return {
        items: [
          {src:require('assets/images/temp/jpg_1.jpg'), active:false},
          {src:require('assets/images/temp/png_1.png'), active:false},
          {src:require('assets/images/temp/jpg_1.jpg'), active:false},
          {src:require('assets/images/temp/png_1.png'), active:false},
          {src:require('assets/images/temp/jpg_1.jpg'), active:false},
          {src:require('assets/images/temp/png_1.png'), active:false},
          {src:require('assets/images/temp/jpg_1.jpg'), active:false},
          {src:require('assets/images/temp/jpg_1.jpg'), active:false},
          {src:require('assets/images/temp/png_1.png'), active:false},
          {src:require('assets/images/temp/png_1.png'), active:false},
        ],
      }
    },
    computed:{
      count(){
        let count = 0;
        for(var key in this.items){
          this.items[key].active && count++
        }
        return count
      }
    },
    methods: {
      onItemClick(index){
        this.items[index].active = !this.items[index].active
      },
      onClick(){
        let imgs = [];
        for(var key in this.items){
          this.items[key].active && (imgs.push(this.items[key].src), this.items[key].active = false)
        }
        this.$emit('send', {
          type: 'imgs',
          message: imgs
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-edit-pic{
    width: 100%;
    height: 100%;
    .edit-pic-imgs{
      height: 3.6rem;
      padding: .1rem 0;
      white-space: nowrap;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .item{
        position: relative;
        height: 100%;
        margin-right: .1rem;
        img{
          height: 100%;
        }
        &::before{
          content: '';
          position: absolute;
          top: .1rem;
          right: .1rem;
          width: .7rem;
          height: .7rem;
          border-radius: 50%;
          border: 1px solid #fff;
          background: rgba(0,0,0,.1);
        }
        &.active::before{
          background: @colorSuccess;
        }
      }
    }
    .edit-pic-opt{
      height: 1.2rem;
      background: @colorF3;
      & > div{
        width: 1.6rem;
        margin: 0 .4rem;
        &.active{
          color: @colorSuccess;
        }
      }
    }
  }
</style>
