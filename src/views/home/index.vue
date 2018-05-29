<template>
  <div class="home-page container" >
    <div class="home-left" :style="transformLeft">
      <home-operate @alert="alert" @homemove="onSwipeMove" @swipe="onSwipe"></home-operate>
    </div>
    <div class="home-content" :style="transformCnt">
      <router-view @operate="onOperate" @homemove="onHomeMove" @hide="onHide"></router-view>
      <div class="home-mask " @click="onHide" :style="transformMask" >
        <touch-move class="page" :isswipe="true" @swipemove="onSwipeMove" @swipe="onSwipe"></touch-move>
      </div>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import Alert from 'components/Alert';
  import TouchMove from 'components/TouchMove';
  import HomeOperate from 'components/home/HomeOperate';

  export default {
    components: {
      Alert,
      HomeOperate,
      TouchMove,
    },
    props: {},
    data() {
      return {
        moveX: 0,
        lastX: 0,
      }
    },
    computed: {
      transformLeft(){
        let move = (this.moveX < 0 ? 0 : this.moveX) - 9*window.REM_SIZE;
        move = move>0 ? 0 : move;
        let tran = 'translate3d('+move/2+'px,0,0);';
        return 'transform:'+tran+'; -webkit-transform:'+tran
      },
      transformCnt(){
        let move = this.moveX < 0 ? 0 : this.moveX;
        move = move>9*window.REM_SIZE ? 9*window.REM_SIZE : move;
        let tran = 'translate3d('+move+'px,0,0);';
        return 'transform:'+tran+'-webkit-transform:'+tran
      },
      transformMask(){
        let tran =  this.moveX == 0 ? 'translate3d(100%,0,0);' : 'translate3d(0,0,0);' ;
        let opt = 'opacity:'+this.moveX/9/window.REM_SIZE;
        return 'transform:'+tran+'-webkit-transform:'+tran+opt
      },
    },

    created(){
      this.$store.commit('update_userinfo', {
        isnew: true,
        level: 59,
        ercode: require('assets/images/ercode/ercode.jpg'),
        bgimg: require('assets/images/home/home-operate.jpg'),
      })
    },
    methods: {
      alert(option){
        this.$refs.alert.show(option)
      },
      onOperate(){
        this.moveX = 9*window.REM_SIZE;
        this.lastX = 9*window.REM_SIZE;
      },
      onHide(){
        this.moveX = 0;
        this.lastX = 0;
      },
      onHomeMove(mx){
        this.moveX = mx;
        this.lastX = mx;
      },
      onSwipeMove(mx){
        if(mx<0){
          this.moveX = this.lastX + mx
        }
      },
      onSwipe(arrow){
        if(arrow == 'left'){
          this.onHide();
        }else if(arrow == 'cancel'){
          this.moveX = this.lastX;
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .home-page{
    .home-left{
      position: absolute;
      top:0;
      left:0;
      bottom:0;
      width: 9rem;
      z-index: 9;
      transform: translate3d(-9rem, 0, 0);
      transition: transform .5s;
    }
    .home-content{
      position: relative;
      transition: transform .5s;
      background: @colorBgPage;
      z-index: 99;
      .home-mask{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background: rgba(0,0,0,.5);
        z-index: 100;
        opacity: 0;
        transform: translate3d(100%, 0, 0);
        transition: opacity .5s;
      }
    }
  }
</style>
