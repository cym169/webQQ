<template>
  <div class="friend-search mask " :class="{'active': active}" v-show="isShow">
    <div class="bg-fff content content-v">
      <search ref="search" :active="true" v-model="value" @input="onInput" @cancel="onCancel" placeholder="QQ号/手机号/群/公众号"></search>
    </div>
    <div class="flex content content-v bottom-border" v-if="value != '' && result" @click="onSearch(1)">
      <i class="iconfont icon-man"></i>
      <div class="text-over col-black" v-text="'找人：'+value"></div>
    </div>
    <div class="flex content content-v bottom-border" v-if="value != '' && result" @click="onSearch(2)">
      <i class="iconfont icon-friendgroup1"></i>
      <div class="text-over col-black" v-text="'找群：'+value"></div>
    </div>
    <div class="flex content content-v bottom-border" v-if="value != '' && result" @click="onSearch(3)">
      <i class="iconfont icon-public1"></i>
      <div class="text-over col-black" v-text="'找公众号：'+value"></div>
    </div>

    <div class="text-center content-v" v-if="!result">
      <div class="content-v">
        <div class="content-v">
          <div class="tip">没有找到相应结果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from 'components/Search';

  import { FriendSearch } from 'servers/API/friend';

  export default {
    components: {
      Search,
    },
    props: {},
    data() {
      return {
        isShow: false,
        active: false,
        result: true,
        value: ''
      }
    },
    methods: {
      onCancel(){
        this.hide();
      },
      onInput(){
        this.result = true;
      },
      onSearch(type){
        FriendSearch({type, value: this.value}).then(res=>{
          if(res){
            let title='';
            if(type == 2){ title='群'}
            if(type == 3){ title='公众号'}
            this.$emit('alert', {
              title: '',
              content: '跳转到'+title+'搜索列表页',
              btns: ['确定'],
            })
          }else{
            this.result = false
          }
        })
      },
      show(){
        this.isShow = true;
        setTimeout(()=>{
          this.active = true;
          this.$refs.search.focus();
        }, 0)
      },
      hide(){
        this.active = false;
        setTimeout(()=>{
          this.isShow = false
        }, 300)
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .friend-search{
    background: @colorBgPage;
    transform: translate3d(0, 100%, 0);
    transition: transform .3s;
    z-index: 99;
    &.active{
      transform: translate3d(0, 0, 0);
    }
    .flex{
      justify-content: flex-start;
      background: @colorFFF;
    }
    &>.flex{
      .iconfont{
        font-size: .8rem;
        font-weight: bold;
        margin-right: .4rem;
      }
    }
  }
</style>
