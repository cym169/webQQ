<template>
  <div class="image-view mask" v-show="active" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <div class="view-item flex" v-for="(item, index) in imgs" :style="getTranPos(index)" >
      <div class="flex-item" :style="'background-image:url('+item+');'+getTouchTran" ></div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        active: false,
        lastPos:{x:0, y:0},
        currPos:{x:0, y:0},
        touchArrow: '',
        touchMove: 0,
        isClick: true,
        current: 0,
        imgs: [],
      }
    },
    computed: {
      getTouchTran(){
        if(this.touchArrow == 'h'){
          let tran = 'translate3d('+this.touchMove+'px,0,0);';
          return 'transform:'+tran+'-webkit-transform:'+tran
        }else if(this.touchArrow == 'v'){
          let o = Math.abs(this.touchMove)/500;
          o = o>1 ? 1 : o;
          let tran = 'translate3d(0,'+this.touchMove+'px,0) scale('+(1-o*.5)+', '+(1-o*.5)+');';
          let opt = 'opacity:'+(1-o);
          return 'transform:'+tran+'-webkit-transform:'+tran+opt
        }
      }
    },
    methods: {
      getTranPos(index){
        let tran = 'translate3d('+(index-this.current)*100+'%,0,0);';
        return 'transform:'+tran+'-webkit-transform:'+tran
      },
      show(option){
        this.current = option.current;
        this.imgs = option.imgs;
        this.active = true;
      },
      onTouchStart(event){
        this.lastPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        }
        this.isClick = true;
      },
      onTouchMove(event){
        this.currPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        }
        this.getMove()
      },
      onTouchEnd(){
        this.lastPos = {x: 0, y: 0};
        this.currPos = {x: 0, y: 0};
        this.isClick ? this.hide() : this.moveEnd();
        this.touchArrow = '';
        setTimeout(()=>{
          this.touchMove = 0;
        }, 100)
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
        }else{
          this.toMove(m_x, m_y)
        }
      },
      toMove(m_x, m_y){
        this.touchMove = this.touchArrow == 'h' ? m_x : m_y
      },
      moveEnd(){
        Math.abs(this.touchMove) > 50 && (
          this.touchArrow == 'h'
            ? this.touchMove > 0 ? this.prev() : this.next()
            : this.hide()
        )
      },
      prev(){
        !(this.current <= 0) && this.current--
      },
      next(){
        !(this.current >= this.imgs.length-1) && this.current++
      },
      hide(){
        this.active = false;
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/animate";
  .image-view{
    animation: fadeIn .5s both;
    .view-item{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      text-align: center;

      transition: transform .2s;
      .flex-item{
        height: 100%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
</style>

