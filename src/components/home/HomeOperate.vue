<template>
  <div class="home-operate">
    <div class="left-userinfo" :style="'background-image:url('+getUserinfo.bgimg+')'">
      <div class="text-right">
        <i class="iconfont icon-ercode" @click="onErcodeClick"></i>
      </div>
      <div class="headimg flex" @click="onHeadimgClick">
        <img :src="getUserinfo.headimg" />
        <span class="flex-item text-over" v-text="getUserinfo.nickname"></span>
        <i class="badge small" v-if="getUserinfo.isnew"></i>
      </div>
      <div class="level">
        <img :src="icons.sun" v-for="n in getLevel(getUserinfo.level).sun" />
        <img :src="icons.moon" v-for="n in getLevel(getUserinfo.level).moon" />
        <img :src="icons.star" v-for="n in getLevel(getUserinfo.level).star" />
      </div>
      <div class="editsignature flex">
        <span class="text-over" v-text="getUserinfo.signature || '编辑个性签名'" @click="onEditClick"></span>
        <i class="iconfont icon-edit" @click="onEditClick"></i>
      </div>
    </div>
    <touch-move class="left-links" :isswipe="true" @swipemove="onSwipeMove" @swipe="onSwipe">
      <template slot="content">
        <div v-for="item in items" class="link-item flex" @click="onItemClick(item.title)">
          <i class="item iconfont " :class="item.icon"></i>
          <div class="flex-item text-over" v-text="item.title"></div>
          <i class="badge small" v-if="item.isnew"></i>
        </div>
      </template>
    </touch-move>
    <div class="left-other flex">
      <div class="flex-item">
        <i class="iconfont icon-setting" @click="onSettingClick"></i>
        <span @click="onSettingClick">设置</span>
      </div>
      <div class="flex-item">
        <i class="iconfont icon-moon" @click="onMoonClick"></i>
        <span @click="onMoonClick">夜间</span>
      </div>
      <div class="flex-item text-center">
        <div class="weather" @click="onItemClick('天气')">
          <span>8</span>
          <i>°</i>
        </div>
        <div @click="onItemClick('天气')">合肥</div>
      </div>
    </div>
  </div>
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
        icons: {
          sun: require('assets/images/icons/icon-sun.png'),
          moon: require('assets/images/icons/icon-moon.png'),
          star: require('assets/images/icons/icon-star.png'),
        },
        items: [
          {icon: 'icon-member', title: '了解会员特权', to:{path:''}},
          {icon: 'icon-wallet', title: 'QQ钱包', to:{path:''}},
          {icon: 'icon-drawboard', title: '个性装扮', to:{path:''}, isnew: true},
          {icon: 'icon-collect', title: '我的收藏', to:{path:''}},
          {icon: 'icon-picture', title: '我的相册', to:{path:''}},
          {icon: 'icon-folder', title: '我的文件', to:{path:''}},
          {icon: 'icon-date', title: '我的日程', to:{path:''}},
        ]
      }
    },
    computed:{
      getUserinfo(){
        let {nickname, headimg, bgimg, level, isnew} = this.$store.getters.getUserInfo;
        return {nickname, headimg, bgimg, level, isnew}
      },
    },
    methods: {
      onSwipeMove(mx){
        mx<0 && this.$emit('homemove', mx);
      },
      onSwipe(arrow){
        this.$emit('swipe', arrow);
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
      onErcodeClick(){
        this.$router.push({
          name: 'ercode'
        })
      },
      onHeadimgClick(){
        this.$router.push({
          name: 'zoo'
        })
      },
      onEditClick(){
        this.$router.push({
          name:'signature'
        })
      },
      onItemClick(title){
        this.$emit('alert', {
          title: '',
          content: '此处跳转到"'+title+'"业务模块',
          btns: ['确定']
        })
      },
      onSettingClick(){
        this.$router.push({
          name: 'setting'
        })
      },
      onMoonClick(){
        this.$emit('alert', {
          title: '',
          content: '此处切换为夜间皮肤',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .home-operate{
    height: 100%;
    background: @colorFFF;
    .left-userinfo{
      color: @colorFFF;
      padding: .5rem;
      background-size: 100% 100%;
      .icon-ercode{
        font-size: 1.2rem;
        line-height: 1.2rem;
        margin-bottom: .5rem;
      }
      .level{
        img{
          width: .45rem;
        }
      }
      .editsignature{
        justify-content: flex-start;
        .text-over{
          font-size: .45rem;
        }
        .icon-edit{
          font-size: .6rem;
          line-height: 1rem;
        }
      }
      .headimg{
        position: relative;
        img{
          width: 1.2rem;
          height: 1.2rem;
          margin-right: .2rem;
          border-radius: 50%;
          border: 2px solid @colorFFF;
        }
        span{
          font-size: .9rem;
          line-height: 1.2rem;
        }
        .badge{
          position: absolute;
          top: 0;
          left: 1rem;
        }
      }
    }
    .left-links{
      padding: .5rem 0;
      .link-item{
        font-size: .45rem;
        color: @color000;
        padding: .2rem .3rem;
        transition: background .2s;
        &:hover{
          background: @colorF3
        }
        .iconfont{
          font-size: .75rem;
          margin-right: .2rem;
        }
      }
    }

    .left-other{
      position: absolute;
      left:0;
      right:0;
      bottom:0;
      font-size: .35rem;
      color: @color000;
      background-color: @colorFFF;
      padding: .4rem .5rem;
      align-items: flex-end;
      .weather{
        color: @colorSuccess;
        margin-right: -.4rem;
        *{
          vertical-align: text-top;
          font-size: .7rem;
          font-style: normal;
        }
        span{
          font-size: 1rem;
          line-height: 1.2rem;
        }
      }
      .iconfont{
        font-size: .5rem;
      }
    }
  }
</style>
