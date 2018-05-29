<template>
  <touch-move v-title="'动态'" class="home-dynamic-list page" :isswipe="true" @swipemove="onSwipeMove" @swipe="onSwipe">

    <template slot="content">
      <div class="msgs-search content content-v">
        <search :status="false" @start="onSearchClick" placehodler="大家都在搜:一些关键字"></search>
      </div>

      <div class="dynamic-list-tab flex text-center">
          <div class="flex-item" @click="onZooClick">
            <i class="iconfont icon-qqzoo1"></i>
            <div>好友动态</div>
            <div class="headimg" v-if="headimg">
              <img :src="headimg" />
              <i class="badge small"></i>
            </div>
          </div>
          <div class="flex-item" @click="onItemClick('附近')">
            <i class="iconfont icon-location1"></i>
            <div>附近</div>
          </div>
          <div class="flex-item" @click="onItemClick('兴趣部落')">
            <i class="iconfont icon-tribe"></i>
            <div>兴趣部落</div>
          </div>
      </div>

      <div class="bar"></div>

      <dynamic-item v-for="item in linkItems" :data="item" @click="onItemClick(item.title)"></dynamic-item>

      <div class="bar"></div>

      <dynamic-item v-for="item in otherItems" :data="item" @click="onItemClick(item.title)"></dynamic-item>
    </template>

  </touch-move>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import Search from 'components/Search';
  import DynamicItem from 'components/dynamic/DynamicItem';

  import { DynamicList } from 'servers/API/dynamic';

  export default {
    components: {
      TouchMove,
      Search,
      DynamicItem,
    },
    props: {},
    data() {
      return {
        headimg: '',
        linkItems: [],
        otherItems: []
      }
    },
    mounted(){
      DynamicList('mine').then(res=>{
        this.headimg = res.headimg;
        this.linkItems = res.linkItems;
        this.otherItems = res.otherItems;
      })
    },
    methods: {
      onSwipeMove(mx){
        mx>0 && this.$emit('homemove', mx);
      },
      onSwipe(arrow){
        if(arrow == 'cancel'){
          this.$emit('homeswipe', false);
        }else if(arrow=='right'){
          this.$emit('homeswipe', true);
        }else if(arrow=='left'){
        }
      },
      onSearchClick(){
        this.$router.push({
          name: 'search/article'
        })
      },
      onZooClick(){
        this.$router.push({
          name: 'zoo'
        })
      },
      onItemClick(title){
        this.$emit('alert', {
          title: '',
          content: '此处跳转到"'+title+'"业务线应用',
          btns: ['确定'],
        })
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  @import "../../assets/less/animate";

  .home-dynamic-list{
    .msgs-search{
      background: @colorFFF;
    }
    .dynamic-list-tab{
      color: @color000;
      background: @colorFFF;
      padding-bottom: .4rem;
      .iconfont{
        font-size: 1.4rem;
        line-height: 1.5rem;
        &.icon-qqzoo1{
          color: #ffd051;
        }
        &.icon-location1{
          color: #f25d5d;
        }
        &.icon-tribe{
          color: #ffd053;
        }
      }
      .flex-item{
        position: relative;
        .headimg{
          position: absolute;
          left: 50%;
          top: .4rem;
          img{
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            border: 1px solid @colorFFF;
          }
          .badge{
            position: absolute;
            top: -.1rem;
            right: -.1rem;
          }
        }
      }
    }
  }
</style>
