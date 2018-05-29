<template>
  <div v-title="'编辑签名'" class="signature-page container flex">
    <myheader @leftClick="onLeftClick" bgcol="transparent">
      <div slot="left" class="inline-row"><i class="item iconfont icon-arrowleft"></i><span class="item">返回</span></div>
      <div slot="title">编辑签名</div>
    </myheader>

    <div class="signature-edit text-center">
      <div class="signature-text" :style="'background-image:url('+skin+')'">
        <textarea v-model="value" rows="4"></textarea>
      </div>
      <div class="button btn-success btn-small" @click="onSubmit">发布签名</div>
    </div>

    <my-nav :items="navs" @click="onNavClick"></my-nav>

    <div class="signature-list flex-item inline-row">
      <div class="item" :class="{'active': activeid==item.id }" v-for="(item, index) in lists" :key="item.id" @click="onItemClick(index)">
        <img class="img-100" :src="item.img" />
        <div class="tip">
          <span v-text="item.title"></span>
          <i :class="item.kind"></i>
        </div>
      </div>
    </div>

    <alert ref="alert"></alert>

  </div>
</template>


<script>
  import Myheader from 'components/MyHeader';
  import MyNav from 'components/MyNav';
  import Alert from 'components/Alert';

  import { getSignatureList, saveSignature} from 'servers/API/signature';

  export default {
    components: {
      Myheader,
      MyNav,
      Alert,
    },
    props: {},
    data() {
      return {
        value: '',
        activeid: '',
        skin: require('assets/images/signature/skin_0.png'),
        navs: [
          '新品尝鲜', '人气热门', '图片个签', '动漫二次元', '情侣专属', '心情笔记'
        ],
        lists:[]
      }
    },
    mounted(){
      getSignatureList(0).then(res=>{
        this.lists = res;
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back();
      },
      onNavClick(index){
        getSignatureList(index).then(res=>{
          this.lists = res;
        })
      },
      onSubmit(){
        saveSignature({
          bgid: this.activeid,
          value: this.value,
        }).then(res=>{
          this.$refs.alert.show({
            title: '恭喜你',
            content: '新的签名保存成功',
          })
        })
      },
      onItemClick(index){
        this.activeid = this.lists[index].id;
        this.skin = this.lists[index].img;
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .signature-page{
    flex-direction: column;
    .signature-edit{
      width: 100%;
      padding-top: 1rem;
      padding-bottom: .5rem;
      background: -webkit-linear-gradient(top, #a6a7a9, #ebecf0);
      .signature-text{
        width: 6rem;
        padding: .5rem .8rem;
        margin: .5rem auto;
        background-size: 100% 100%;
      }
    }
    textarea{
      border: 0;
      background: transparent;
    }
    .signature-list{
      width: 100%;
      overflow: auto;
      .item{
        position: relative;
        width: 30.3333%;
        padding: .3rem 1.5%;
        &.active::before{
          content: '√';
          position: absolute;
          right: .1rem;
          top: .1rem;
          font-size: .4rem;
          display: block;
          color: @colorFFF;
          background: @colorSuccess;
          width: .5rem;
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          border-radius: 50%;
        }
        i{
          font-family: 'consolas';
          font-size: 12px;
          line-height: 12px;
          font-style: normal;
          padding: 0 .2rem;
          &.vip{
            color: @colorFFF;
            background: @colorError;
            &::before{
              content: 'VIP';
            }
          }
          &.svip{
            color: @colorError;
            background: #ffff00;
            &::before{
              content: 'SVIP';
            }
          }
        }
      }
    }
  }
</style>
