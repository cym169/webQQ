<template>
  <touch-move class="chat-edit-more" :canVer="false" :isswipe="true" @swipe="onSwipe" @swipemove="onSwipeMove">
    <template slot="content" >
      <div class="edit-more-cnt ">
        <div class="item" :class="{'active': active==0, 'prev':active==1}" :style="active==0?swipemove:''">
          <div class="more-item" v-for="item in items1" @click="onItemClick(item.title)">
            <i class="iconfont" :class="item.icon" :style="'color:'+item.color" ></i>
            <div v-text="item.title"></div>
            <i class="badge small" v-if="item.isnew"></i>
          </div>
        </div>
        <div class="item" :class="{'active': active==1, 'next':active==0}" :style="active==1?swipemove:''">
          <div class="more-item" v-for="item in items2" @click="onItemClick(item.title)">
            <i class="iconfont" :class="item.icon" :style="'color:'+item.color" ></i>
            <div v-text="item.title"></div>
            <i class="badge small" v-if="item.isnew"></i>
          </div>
        </div>
      </div>
      <div class="edit-more-page text-center">
        <i class="badge small" :class="{'active': active==0}"></i>
        <i class="badge small" :class="{'active': active==1}"></i>
      </div>
    </template>
  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';

  export default {
    components: {
      TouchMove,
    },
    props: {},
    data() {
      return {
        active: 0,
        touchmove: 0,
        items1: [
          {title: 'QQ电话', icon: 'icon-phone', color: '#00c89d', isnew: false},
          {title: '视频电话', icon: 'icon-video', color: '#00c89d', isnew: false},
          {title: '收藏', icon: 'icon-collect', color: '#4394f8', isnew: true},
          {title: '发红包', icon: 'icon-redpacket', color: '#f25d5d', isnew: false},
          {title: '文件', icon: 'icon-folder', color: '#4394f8', isnew: true},
          {title: '戳一戳', icon: 'icon-video', color: '#529eff', isnew: false},
          {title: '转账', icon: 'icon-transfor', color: '#6ace14', isnew: true},
          {title: '音乐', icon: 'icon-music', color: '#6ace14', isnew: false},
        ],
        items2: [
          {title: '位置', icon: 'icon-location1', color: '#ffa556', isnew: false},
          {title: '推荐联系人', icon: 'icon-friendnew', color: '#12b7f6', isnew: false},
          {title: '悄悄话', icon: 'icon-faceless', color: '#12b7f6', isnew: false},
        ],
      }
    },
    computed:{
      swipemove(){
        let tran = 'translate3d('+this.touchmove+'px,0,0)';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      },
    },
    methods: {
      onSwipe(arrow){
        if(arrow=='left'){
          this.active = 1
        }else if(arrow=='right'){
          this.active = 0
        }
        this.touchmove = 0
      },
      onSwipeMove(move){
        this.touchmove = move
      },
      onItemClick(title){
        this.$emit('alert',{
          title: '',
          content: '此处操作'+title+'功能',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-edit-more{
    width: 100%;
    height: 100%;
    .edit-more-cnt {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      font-size: 0;
      & > .item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: transform .3s;
        &.active {
          transform: translate3d(0, 0, 0);
        }
        &.prev {
          transform: translate3d(-100%, 0, 0);
        }
        &.next {
          transform: translate3d(100%, 0, 0);
        }
      }
      .more-item{
        position: relative;
        display: inline-block;
        width:2rem;
        height: 2rem;
        margin: .2rem .5rem;
        font-size: .3rem;
        text-align: center;
        .iconfont{
          font-size: 1.2rem;
          line-height: 1.5rem;
        }
        .badge{
          position: absolute;
          top: .1rem;
          right: .1rem;
        }
      }
    }
    .edit-more-page {
      position: absolute;
      left: 0;
      right: 0;
      bottom: .2rem;
      overflow: hidden;
      .badge {
        margin: 0 .2rem;
        background: @colorBBB;
        &.active{
          background: @color777;
        }
      }
    }
  }
</style>
