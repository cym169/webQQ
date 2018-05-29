<template>
  <div class="search-friend ">
    <div class="content content-v">
      <search :active="true" v-model="value" @input="onSearchInput" @cancel="onCancel" @change="onSearchChange"></search>
    </div>

    <div class="content" v-if="searchHistory.length>0 && value==''" >
      <div class="tip">搜索历史</div>

      <div class="friend-item flex" v-for="(item, index) in searchHistory" :key="item.id">
        <img :src="item.headimg" class="headimg" />
        <div class="title flex-item text-over " v-text="item.title"></div>
        <i class="iconfont icon-delete" @click="onDelClick(index)"></i>
      </div>
    </div>

    <div class="bar"></div>

    <div class="content content-v" v-show="value != ''">
      <div class="text-center content-v">显示搜索“{{value}}”的结果</div>
    </div>

    <div class="content"  v-show="value == ''">
      <div class="tip">快捷搜索</div>
      <div class="friend-link flex text-center">
        <router-link class="flex-item inline-row" tag="div" :to="{name:'search/classify', params: {type: 'zoo'}}">
          <i class="item iconfont icon-qqzoo"></i>
          <span class="item">好友动态</span>
        </router-link>
        <div class="line"></div>
        <router-link class="flex-item inline-row" tag="div" :to="{name:'search/classify', params: {type: 'article'}}">
          <i class="item iconfont icon-file"></i>
          <span class="item">文章</span>
        </router-link>
        <div class="line"></div>
        <router-link class="flex-item inline-row" tag="div" :to="{name:'search/classify', params: {type: 'public'}}">
          <i class="item iconfont icon-public1"></i>
          <span class="item">公众号</span>
        </router-link>
      </div>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import Search from 'components/Search';
  import Alert from 'components/Alert';

  import storage from 'servers/localStorage';

  export default {
    components: {
      Search,
      Alert,
    },
    props: {},
    data() {
      return {
        value: '',
        searchHistory: [],
      }
    },
    mounted(){
      this.searchHistory = storage.get('search_friend_history') || []
    },
    methods: {
      onCancel(){
        this.$router.back()
      },
      onDelClick(index){
        this.searchHistory.splice(index, 1);
        storage.set('search_friend_history', this.searchHistory);
      },
      onSearchInput(value){
        console.log('result list with search:', value)
      },
      onSearchChange(value){
        if(value == ''){return}
        let list = this.searchHistory;
        for(let key in list){
          if(list[key].id == value){
            return
          }
        }
        list.push({
          id: value,
          headimg: require('assets/images/common/headimg_def.jpg'),
          title:value
        })
        storage.set('search_friend_history', list)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .search-friend{
    .content{
      background-color: @colorFFF;
    }
    .tip{
      padding: .1rem 0;
      margin-left: .4rem;
      border-bottom: 1px solid @colorBorder;
    }
    .friend-item{
      padding: .2rem .4rem;
      border-bottom: 1px solid @colorBorder;
      .headimg{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-right: .4rem;
      }
      .title{
        margin-right: .4rem;
        text-align: left;
      }
      .icon-delete{
        font-size: .45rem;
        color: @color777;
      }
    }
    .friend-link{
      padding: .2rem;
      font-size: .4rem;
      .line{
        width: 1px;
        height: .8rem;
        background-color: @colorBorder;
      }
      .iconfont{
        font-size: .8rem;
        line-height: 1rem;
      }
    }
  }
</style>
