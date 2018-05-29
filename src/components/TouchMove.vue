<template>
  <div class="touch-move" ref="scroll"
       @touchstart="onTouchStart" @touchmove.stop="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <div class="touch-refresh" :style="transformBody" >
      <slot name="refresh"></slot>
    </div>
    <div class="touch-content" :style="transformBody">
      <slot name="content"></slot>
    </div>
    <div class="touch-loading" :style="transformBody" v-show="isLoadingShow">
      <slot name="loading"></slot>
    </div>
  </div>
</template>

<script>
  import { getScrollTop, scrollPosition, scrollToTop, scrollToEnd } from 'utils/domElement';
  import animate from 'utils/animate';

  export default {
    components: {},
    props: {
      refresh: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      isswipe:{
        type: Boolean,
        default: false,
      },
      canVer:{//可以纵向滑动
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        moveBody: null,
        touchFlag: true,
        touchArrow: null,
        lastPos: {x: 0, y: 0},
        currPos: {x: 0, y: 0},
        posMove: {x: 0, y: 0},
        bodyMoveY: 0,
        refreshFlag: false,
        loadingFlag: false,
        isLoadingShow: false,
        isClick: true,
        swipeFlag: false,
        swipeArrow: false,
        clickTarget: null,
      }
    },
    computed:{
      transformBody(){
        let translate = ' translate3d(0, '+this.bodyMoveY+'px, 0) ';
        return ' transform: '+translate+'; -webkit-transform:'+translate;
      },
    },
    mounted(){
      this.moveBody = this.$el.getElementsByClassName('touch-content')[0];
    },
    methods: {
      onTouchStart(event){
        this.lastPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }
        this.isClick = true;
        this.clickTarget = event.target;
        this.$emit('target', event.target)
      },
      onTouchMove(event){
        if(!this.touchFlag){ event.preventDefault(); return;}
        this.currPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
        this.getMove() && event.preventDefault();
      },
      onTouchEnd(event){
        this.lastPos = {x: 0, y: 0};
        this.currPos = {x: 0, y: 0};
        this.isClick && this.touchFlag ? this.$emit('click', this.clickTarget) : (event.stopPropagation(), this.moveEnd());
      },
      reset(){
        this.touchArrow = null;
        this.touchFlag = true;
        this.lastPos = {x: 0, y: 0};
        this.currPos = {x: 0, y: 0};
        this.posMove = {x: 0, y: 0};
        this.swipeFlag = false;

        animate({
          start: this.bodyMoveY,
          end: 0,
          current: this.bodyMoveY,
          duration: 100,
          callback: (value, isend)=>{
            this.bodyMoveY = value;
            isend && (
              this.refreshFlag = false,
              this.loadingFlag = false,
              this.isLoadingShow = false,
              this.isClick = false
            );
          },
        });
      },
      getMove(){
        let m_x = this.currPos.x - this.lastPos.x,
          m_y = this.currPos.y - this.lastPos.y;
        let m_abs_x = Math.abs(m_x),
          m_abs_y = Math.abs(m_y);
        this.isClick = !(m_abs_x > 10 || m_abs_y>10)
        if(!this.touchArrow){
          if(m_abs_x > 5){
            this.touchArrow = 'h'//横向移动
          }else if(m_abs_y > 5){
            this.touchArrow = 'v'//纵向移动
          }
        }else if(this.touchArrow == 'h'){
          this.$emit('swipemove', m_x);
          this.swipeFlag = m_abs_x > 50;
          this.swipeArrow = m_x>0;
          return true;
        }else if(this.touchArrow == 'v' && this.canVer){
          return this.refreshLoading(m_y)
        }
      },
      refreshLoading(m_y){
        let type = scrollPosition(this.moveBody, m_y);
        if(type == 'top' && m_y > 0){
          this.bodyMoveY = m_y;
          this.refreshFlag = m_y > 2*REM_SIZE;
          this.$emit('refreshstep', this.refreshFlag ? 1 : 0)
          return true;
        }else if(type == 'bottom' && m_y < 0){
          this.bodyMoveY = m_y;
          this.loadingFlag = m_y < -2*REM_SIZE;
          return true;
        }
        let top = getScrollTop(this.moveBody);
        this.$emit('scroll', top)
        return false;
      },
      moveEnd(){
        if(this.refreshFlag && this.refresh){
          this.touchFlag = false;
          this.$emit('refreshstep', 2)
          animate({
            start: 30*REM_SIZE,
            end: 2*REM_SIZE,
            current: this.bodyMoveY*1,
            duration: 400,
            callback: (value, isend)=>{
              this.bodyMoveY = value;
              isend && this.$emit('refresh');
            },
          })
          return
        }
        if(this.loadingFlag && this.loading){
          this.touchFlag = false;
          this.isLoadingShow = true;
          this.bodyMoveY = -2*REM_SIZE;
          this.$emit('loading')
          return
        }
        if(this.isswipe){
          this.touchFlag = false;
          if(this.swipeFlag){
            if(this.swipeArrow){
              //向右滑动
              this.$emit('swipe', 'right')
            }else{
              //向左滑动
              this.$emit('swipe', 'left')
            }
          }else{
            this.$emit('swipe', 'cancel')
          }
        }
        animate({
          start: this.bodyMoveY,
          end: 0,
          current: this.bodyMoveY,
          duration: 200,
          callback: (value, isend)=>{
            this.bodyMoveY = value;
            isend && this.reset();
          },
        })
      },
      moveToTop(){
        this.$nextTick(() =>{
          scrollToTop(this.moveBody)
        })
      },
      moveToEnd(){
        this.$nextTick(() =>{
          scrollToEnd(this.moveBody)
        })
      }
    }
  }
</script>

<style lang="less">
  .touch-move{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .touch-refresh{
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 100%;
      min-height: 2rem;
    }
    .touch-content{
      height: 100%;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .touch-loading{
      position: absolute;
      left: 0;
      width: 100%;
      top: 100%;
      min-height: 2rem;
    }
  }
</style>
