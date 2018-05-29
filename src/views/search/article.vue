<template>
  <div class="search-article container">
    <div class="content content-v flex">
      <i class="iconfont icon-arrowleft" @click="onleftClick"></i>
      <div class="flex-item">
        <search :active="true" btn="搜索" v-model="value" @search="onSearch"></search>
      </div>
    </div>

    <touch-move class="article-content">
      <template slot="content">
        <div class="content">
          <div class="tip float-fixed">
            <div class="fl">大家正在搜</div>
            <div class="link fr">社交指数榜&gt;</div>
          </div>
        </div>
        <div class="content">
          <div class="hot-li flex">
            <div class="i text-center">1</div>
            <div class="hot-item flex-item">热点搜索1</div>
            <div class="line"></div>
            <div class="i text-center">2</div>
            <div class="hot-item flex-item">热点搜索2</div>
          </div>
          <div class="hot-li flex">
            <div class="i text-center">3</div>
            <div class="hot-item flex-item">热点搜索3</div>
            <div class="line"></div>
            <div class="i text-center">4</div>
            <div class="hot-item flex-item">热点搜索4</div>
          </div>
          <div class="hot-li flex">
            <div class="i text-center">5</div>
            <div class="hot-item flex-item">热点搜索5</div>
            <div class="line"></div>
            <div class="i text-center"></div>
            <div class="hot-item flex-item"></div>
          </div>
        </div>

        <div class="bar"></div>
        <div class="content">
          <div class="tip ">搜索历史</div>
          <div class="history-item content flex" v-for="(item, index) in searchHistory" >
            <div class="title flex-item text-over " v-text="item"></div>
            <i class="iconfont icon-delete" @click="onDelClick(index)"></i>
          </div>
        </div>
      </template>
    </touch-move>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';
  import Search from 'components/Search';
  import Alert from 'components/Alert';

  export default {
    components: {
      TouchMove,
      Search,
      Alert,
    },
    props: {},
    data() {
      return {
        value: '',
        searchHistory: ['搜索历史1', '历史关键字2', '历史记录3'],
      }
    },
    methods: {
      onleftClick(){
        this.$router.back()
      },
      onDelClick(index){
        this.searchHistory.splice(index, 1)
      },
      onSearch(){
        this.value != '' &&
        this.$refs.alert.show({
          title: '',
          content: '显示搜索“'+this.value+'”结果',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";
  .search-article{
    .article-content{
      height: 100%;
      background-color: @colorFFF;
    }
    .content{
      background-color: @colorFFF;
    }
    .bar{
      background: @colorBgPage;
    }
    .icon-arrowleft{
      margin-right: .4rem;
    }
    .tip{
      padding: .1rem 0;
      border-bottom: 1px solid @colorBorder;
    }
    .link{
      color: @colorWorning;
    }
    .hot-li{
      color: @color000;
      font-size: .45rem;
      padding: .2rem 0;
      border-bottom: 1px solid @colorBorder;
      .line{
        width: 1px;
        height: .8rem;
        background: @colorBorder;
        margin: 0 .4rem;
      }
      .i{
        color: @colorBBB;
        background: transparent;
        width: .5rem;
        height: .5rem;
        line-height: .5rem;
        border-radius: 3px;
        margin-right: .2rem;
        font-size: .35rem;
        &:nth-of-type(n+3){
          color: @colorBBB;
          background: transparent;
        }
      }
      &:nth-child(1),&:nth-child(2){
        .i{
          color: @colorFFF;
          background: @colorWorning;
        }
      }
      &:nth-child(2){
        .i:nth-child(4){
          color: @colorBBB;
          background: transparent;
        }
      }
    }
    .history-item{
      border-bottom: 1px solid @colorBorder;
      .title{
        color: @color000;
        text-align: left;
      }
    }
  }
</style>
