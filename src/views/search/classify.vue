<template>
  <div class="search-classify ">
    <div class="content content-v flex">
      <i class="iconfont icon-arrowleft" @click="onleftClick"></i>
      <div class="flex-item">
        <search :active="true" :placeholder="searchPlaceholder" @input="onSearchChange" @cancel="onleftClick"></search>
      </div>
    </div>

    <div class="content" v-if="getType == 'zoo'">
      <div class="tip">动态精选</div>
      <div class="content content-v inline-row">
        <div class="item item-tag" v-for="item in zooTags" v-text="item"></div>
      </div>
    </div>

    <div class="content" v-if="getType == 'article'">
      <div class="tip">热门搜索</div>
      <div class="hot-tags content content-v inline-row">
        <div class="item item-tag" v-for="item in articleTags" v-text="item"></div>
      </div>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import Search from 'components/Search';
  import Alert from 'components/Alert';

  export default {
    components: {
      Search,
      Alert,
    },
    props: {},
    data() {
      return {
        zooTags: ['特别关心', '那年今日', '公众空间'],
        articleTags: ['火爆社交圈的十件事', '同学，你的排行榜', '答题签到赢金币', '一些搜索tag', '更多热点→_→']
      }
    },
    computed: {
      searchPlaceholder(){
        let type = this.$route.params.type;
        return type == 'zoo' ? '搜索'
          : type == 'article' ? '搜索相关文章'
            : '搜索公众号'
      },
      getType(){
        return this.$route.params.type || ''
      }
    },
    methods: {
      onleftClick(){
        this.$router.back()
      },
      onSearchChange(value){
        value != '' &&
        this.$refs.alert.show({
          title: '',
          content: '显示搜索“'+value+'”结果',
          btns: ['确定']
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .search-classify{
    .icon-arrowleft{
      font-size: .7rem;
      line-height: 1rem;
      margin-right: .4rem;
      color: @colorBBB;
    }
    .content{
      background-color: @colorFFF;
    }
    .tip{
      margin-left: .4rem;
      border-bottom: 1px solid @colorBorder;
    }
    .item-tag{
      font-size: .4rem;
      line-height: .8rem;
      border-radius: .4rem;
      padding: 0 .3rem;
      margin-right: .2rem;
      margin-bottom: .2rem;
      color: @color000;
      border: 1px solid @colorBorder;
    }
    .hot-tags{
      .item-tag{
        color: @colorError;
        border: 1px solid @colorError;
      }
      .item-tag:nth-child(n+3){
        color: @color000;
        border: 1px solid @colorBorder;
      }
    }
  }
</style>
