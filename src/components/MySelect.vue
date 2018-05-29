<template>
  <div class="my-select flex ">
    <div class="flex-item" v-text="label || placeholder || '请选择'" @click="show"></div>
    <i class="iconfont icon-arrowright" @click="show"></i>

    <div class="select-list container " :class="{'active': active}" v-show="isShow">
      <touch-move class="page">
        <div slot="content" class="top-border">
          <div class="select-item float-fixed bottom-border content content-v" v-for="(item, index) in list" @click="onItemClick(index)">
            <div class="text-over fl" v-text="item.label"></div>
            <i class="iconfont icon-success fr" v-show="item.id == id"></i>
          </div>
        </div>
      </touch-move>
    </div>
  </div>
</template>

<script>
  import TouchMove from 'components/TouchMove';

  export default {
    components: {
      TouchMove,
    },
    props: {
      list: Array,
      value: String,
      title: String,
      placeholder: String,
    },
    data() {
      return {
        id: '',
        label: '',
        active: false,
        isShow: false,
      }
    },
    mounted(){
      for(let key in this.list){
        if(this.list[key].id == this.value){
          this.label = this.list[key].label
        }
      }
    },
    methods: {
      onItemClick(index){
        this.id = this.list[index].id;
        this.label = this.list[index].label;
        this.$emit('input', this.id)
        this.hide()
      },
      show(){
        this.active = true
        this.isShow = true
      },
      hide(){
        this.active = false
        setTimeout(()=>{
          this.isShow = false
        }, 300)
      },
      onLeftClick(){
        this.hide()
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/theme";

  .my-select{
    height: 1.4rem;
    padding: 0 5px;

    .icon-arrowright{
      color: @colorBBB;
    }
    .select-list{
      position: fixed;
      left: 0;
      top: 0;
      background: @colorBgPage;
      z-index: 1000;
      transform: translate3d(100%, 0, 0);
      transition: transform .3s;
      .select-item{
        background: @colorFFF;
      }
      &.active{
        transform: none;
      }
    }
    .icon-success{
      color: @colorOk;
      font-size: .7rem;
      font-weight: bold;
    }
  }
</style>
