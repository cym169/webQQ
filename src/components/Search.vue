<template>
  <div class="search flex">
    <div class="search-bd flex-item flex" @click="onStartClick">
      <i class="iconfont icon-search"></i>
      <span class="search-def-text" v-show="!isSearch" v-text="placeholder"></span>
      <div class="flex-item" v-show="isSearch">
        <my-input type="text" :placeholder="placeholder" v-model="value" :focus="active" @change="onChange"></my-input>
      </div>
    </div>
    <div class="search-cancel content" v-show="isSearch" v-if="!btn" @click="onCancelClick">取消</div>
    <div class="search-cancel content" v-show="isSearch" v-if="btn" @click="onSearchClick">搜索</div>
  </div>
</template>



<script>
  import MyInput from './MyInput';

  export default {
    components: {
      MyInput,
    },
    props: {
      status: {
        type: Boolean,
        default: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '搜索'
      },
      btn: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        value: '',
        isSearch: false,
      }
    },
    watch: {
      value(){
        this.$emit('input', this.value);
      }
    },
    mounted(){
      this.active && (this.isSearch = true);
    },
    methods: {
      onStartClick(){
        if(this.status){
          this.isSearch = true;
        }
        this.$emit('start');
      },
      onCancelClick(){
        this.isSearch = false;
        this.value= '';
        this.$emit('input', this.value);
        this.$emit('cancel');
      },
      onSearchClick(){
        this.$emit('search')
      },
      onChange(){
        this.$emit('change', this.value)
      },
      focus(){
        this.active && (this.isSearch = true);
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";
  .search{
    line-height: .9rem;
    font-size: .45rem;
    .icon-search{
      font-size: .6rem;
      margin-left: 5px;
    }
    .search-bd{
      border-radius: 3px;
      background: @colorF3;
    }
    .my-input{
      height: .9rem;
      background: transparent;
      input{
        font-size: .45rem;
        line-height: .9rem;
        background: transparent;
      }
    }
    .search-cancel{
      color: @colorSuccess;
    }
  }

</style>
