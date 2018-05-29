<template>
  <div v-title="''" class="zoo-other-page container ">
    <my-header @leftClick="onLeftClick" @rightClick="onRightClick" :bgcol="headerBg">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title"></div>
      <div slot="right">更多</div>
    </my-header>

    <div class="page" @touchstart="onTouchStart" @touchmove.stop="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
      <div class="zoo-other-top text-center">
        <div class="top-bg" :style="'background-image:url('+info.bgimg+');'+moveHeight "></div>
        <div class="top-info">
          <div class="top-zan" @click="onZan">
            <i class="iconfont icon-like"></i>
            <span v-text="info.zan"></span>
          </div>
          <img class="top-headimg" :src="info.headimg" />
          <div class="top-title" v-text="info.title"></div>
          <div class="top-tip col-black" v-text="info.signature"></div>
          <div class="top-tag top-tip" :class="info.sex==1 ? 'male' : 'female'">
            <i class="iconfont icon-male" v-if="info.sex == 1" />
            <i class="iconfont icon-female" v-else />
            <span v-if="info.age" v-text="info.age+'岁'"></span>
            <span v-if="info.location" v-text="info.location"></span>
          </div>
        </div>
        <i class="iconfont icon-like" v-for="item in likeIcons" v-show="item.active"
           :style="'color: '+item.color"></i>
      </div>

      <div class="zoo-other-cnt bottom-border" v-if="info.zooImg">
        <div class="flex content content-v top-border">
          <i class="iconfont icon-qq1"></i>
          <div class="flex-item content">
            <div class="col-black text-over" v-text="info.account+'('+info.nickname+')'"></div>
            <div class="inline-row">
              <div class="item level">
                <img :src="icons.sun" v-for="n in getLevel(info.level).sun" />
                <img :src="icons.moon" v-for="n in getLevel(info.level).moon" />
                <img :src="icons.star" v-for="n in getLevel(info.level).star" />
              </div>
              <div class="item tip">慢速中</div>
            </div>
          </div>
        </div>
        <div class="flex content content-v top-border">
          <i class="iconfont icon-member"></i>
          <div class="flex-item content">
            <div class="col-black" v-if="info.vip.length == 0">TA还未开通任何特殊服务</div>
          </div>
          <i class="iconfont icon-arrowright"></i>
        </div>
        <div class="flex content content-v top-border">
          <i class="iconfont icon-qqzoo"></i>
          <div class="flex-item content">
            <div class="cnt-imgs inline-row">
              <div class="item" v-for="(item, index) in info.zooImg.imgs" :style="'background-image:url('+item+')'">
                <div v-if="index == info.zooImg.imgs.length-1" v-text="info.zooImg.count"></div>
              </div>
            </div>
            <div class="col-black" v-text="info.zooImg.desc"></div>
          </div>
          <i class="iconfont icon-arrowright"></i>
        </div>
      </div>

      <div class="content-v"></div>
      <div class="zoo-other-divider">兴趣部落</div>
      <div class="bar"></div>

      <div class="flex content content-v top-border bg-fff">
        <div class="flex-item">兴趣部落</div>
        <i class="iconfont icon-arrowright"></i>
      </div>

      <div class="flex content content-v top-border bg-fff" v-for="item in info.likes">
        <img class="like-img" :src="item.img" />
        <div class="flex-item">
          <div class="col-black text-over" v-text="item.title"></div>
          <div class="tip text-over" v-text="item.tip"></div>
          <div class="tip text-over" v-text="item.info"></div>
        </div>
      </div>

    </div>

    <div class="zoo-other-btns inline-row content-v text-center">
      <div class="item button btn-normal" @click="onPhoneClick">QQ电话</div>
      <div class="item button btn-success" @click="onMsgClick">发消息</div>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';

  import { FriendInfo } from 'servers/API/friend';
  import { getScrollTop, scrollPosition } from 'utils/domElement';

  export default {
    components: {
      MyHeader,
      Alert,
    },
    props: {},
    data() {
      return {
        icons: {
          sun: require('assets/images/icons/icon-sun.png'),
          moon: require('assets/images/icons/icon-moon.png'),
          star: require('assets/images/icons/icon-star.png'),
        },
        info: {},
        likeIcons: [],
        lastY: 0,
        currY: 0,
        moveY: 7*window.REM_SIZE,
        moveO: 0,
        moveBody: null,
      }
    },
    computed: {
      moveHeight(){
        return 'height:'+this.moveY+'px'
      },
      headerBg(){
        return 'rgba(30, 185, 242, '+this.moveO+')'
      }
    },
    mounted(){
      FriendInfo(this.$route.params.id).then(res=>{
        this.info = res
      })
      this.moveBody = this.$el.getElementsByClassName('page')[0];
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onRightClick(){
        this.$router.push({
          name:'zoo/more',
          params:{id: this.info.id}
        })
      },
      getLevel(level){
        let lvl = level;
        let sun = Math.floor(lvl/16);
        lvl = lvl % 16;
        let moon = Math.floor(lvl/4);
        let star = lvl % 4;
        return {
          sun, moon, star
        }
      },
      onPhoneClick(){
        this.$refs.alert.show({
          title: '',
          content: '调用语音电话',
          btns: ['确定']
        })
      },
      onMsgClick(){
        this.$router.push({
          name: 'chat',
          params: {
            id: this.info.id
          }
        })
      },
      onZan(){
        let index = -1;
        let col = Math.round(Math.random()*360);
        this.info.zan++;
        for(let i=0; i<this.likeIcons.length; i++){
          if(!this.likeIcons[i].active){
            index = i;
            break
          }
        }
        if(index == -1){
          this.likeIcons.push({active: true, color: '#fff'});
          index = this.likeIcons.length-1;
        }
        this.likeIcons[index].active = true;
        this.likeIcons[index].color = 'hsl('+col+', 100%, 50%)';
        setTimeout(()=>{
          this.likeIcons[index].active = false;
        }, 1100)
      },
      onTouchStart(event){
        this.lastY = event.touches[0].clientY
      },
      onTouchMove(event){
        this.currY = event.touches[0].clientY;
        this.moveY = (this.currY-this.lastY)/2;
        let pos = scrollPosition(this.moveBody, this.moveY);
        if(pos == 'top'){
          this.moveY += 7*window.REM_SIZE;
        }else if(pos == 'body'){
          this.moveY = 7*window.REM_SIZE;
        }
        let top = getScrollTop(this.moveBody, this.moveY);
        this.moveO = top/5/window.REM_SIZE;
      },
      onTouchEnd(event){
        this.moveY = 7*window.REM_SIZE;
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @keyframes zan-move {
    0%{transform: translate3d(0, 0, 0) scale(.5, .5); opacity: 1}
    100%{transform: translate3d(-.5rem, -4rem, 0) scale(1, 1); opacity: 0}
  }
  .zoo-other-page{
    padding-bottom: 2rem;
    .zoo-other-top{
      position: relative;
      background: @colorFFF;
      padding-bottom: .2rem;
      .top-bg{
        width: 100%;
        height: 7rem;
        background-position: center;
        background-size: cover;
        transition: height .2s;
      }
      .top-info{
        position: relative;
        margin-top: -1.5rem;
        color: @color000;
        .top-zan{
          position: absolute;
          top: .4rem;
          right: .4rem;
          background: rgba(0,0,0,.5);
          color: @colorFFF;
          height: .7rem;
          line-height: .7rem;
          border-radius: .35rem;
          padding: 0 .3rem;
          font-size: .3rem;
        }
        .top-headimg{
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          box-shadow: 0 0 0 2px @colorFFF;
        }
        .top-title{
          font-size: .7rem;
          line-height: 1.2rem;
        }
        .top-tip{
          font-size: .3rem;
        }
        .top-tag{
          display: inline-block;
          color: @colorFFF;
          padding: 0 .2rem;
          border-radius: 3px;
          &.male{
            background: @colorSuccess;
          }
          &.female{
            background: @colorError;
          }
        }
      }
      & > .icon-like{
        position: absolute;
        top: 5.9rem;
        right: 1rem;
        font-size: 1rem;
        line-height: 1rem;
        opacity: 1;
        animation: zan-move 1s both;
      }
    }
    .zoo-other-cnt{
      background: @colorFFF;
      .level{
        display: inline-block;
        img{
          width: .45rem;
        }
      }
      .cnt-imgs{
        .item{
          width: 1.6rem;
          height: 1.6rem;
          margin-right: 2px;
          background-size: cover;
          div{
            background: rgba(0,0,0,.3);
            line-height: 1.6rem;
            text-align: center;
            color: @colorFFF;
          }
        }
      }
      .iconfont{
        font-size: .8rem;
        &.icon-arrowright{
          font-size: .5rem;
        }
      }
    }
    .zoo-other-divider{
      font-size: .6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before{
        content:'';
        width: 1.6rem;
        height: 5px;
        background-image: linear-gradient(-60deg, transparent, transparent 1px, @colorBorder 1px, @colorBorder 2px, transparent 2px);
        background-size: 4px 5px;
        margin-right: .3rem;

      }
      &::after{
        content:'';
        width: 1.6rem;
        height: 5px;
        background-image: linear-gradient(-60deg, transparent, transparent 1px, @colorBorder 1px, @colorBorder 2px, transparent 2px);
        background-size: 4px 5px;
        margin-left: .3rem;
      }
    }
    .like-img{
      width: 2rem;
      height: 2rem;
      margin-right: .4rem;
    }
    .zoo-other-btns{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      .button{
        width: 40%;
        margin: 0 .2rem;
      }
    }
  }
</style>
