<template>
  <div v-title="'更多'" class="zoo-more-page container has-header " >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">返回</span>
      </div>
      <div slot="title">更多</div>
    </my-header>

    <touch-move>
      <template slot="content">
        <div class="bar bottom-border"></div>

        <cell label="昵称" is-link @click="onAlert('修改昵称')">
          <div class="text-right tip" slot="input" v-text="info.nickname"></div>
        </cell>
        <cell label="详细资料" is-link @click="onAlert('详细资料')"></cell>
        <cell label="备注" is-link @click="onAlert('修改备注')">
          <div class="text-right tip" slot="input" v-text="info.title"></div>
        </cell>
        <cell label="分组" is-link @click="onAlert('编辑分组')">
          <div class="text-right tip" slot="input" v-text="info.groupname"></div>
        </cell>
        <div class="bar bottom-border"></div>
        <cell label="推荐该联系人" is-link long-label @click="onAlert('推荐该联系人')"></cell>
        <div class="bar bottom-border"></div>
        <cell label="好友动态设置" is-link long-label @click="onAlert('好友动态设置')"></cell>
        <cell label="日迹设置" is-link @click="onAlert('日迹设置')"></cell>
        <cell label="特别关心" is-link @click="onAlert('特别关心')">
          <div class="text-right tip" slot="input">未启用</div>
        </cell>
        <cell label="隐藏到不常用联系人" long-label>
          <div class="text-right" slot="input">
            <div class="blind-switch">
              <my-switch v-model="isBlind"></my-switch>
            </div>
          </div>
        </cell>


        <div class="content-v"></div>
        <div class="content">
          <div class="button btn-error" @click="onDelClick">删除好友</div>
        </div>

        <div class="content content-v text-center">
          <a @click="onAlert('举报用户')">被骚扰了，举报该用户</a>
        </div>

      </template>
    </touch-move>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import TouchMove from 'components/TouchMove';
  import Cell from 'components/Cell';
  import MySwitch from 'components/MySwitch';

  import { FriendInfo } from 'servers/API/friend'

  export default {
    components: {
      MyHeader,
      Alert,
      TouchMove,
      Cell,
      MySwitch,
    },
    props: {},
    data() {
      return {
        id: this.$route.params.id,
        info: {},
        isBlind: false,
      }
    },
    mounted(){
      FriendInfo({id: this.id}).then(res=>{
        this.info = res
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onAlert(title){
        this.$refs.alert.show({
          title: '',
          content: '此处跳转'+title+'模块',
          btns: ['确定']
        })
      },
      onDelClick(){
        this.$refs.alert.show({
          title: '警告',
          content: '是否删除该好友',
          btns: ['取消', '确定'],
          callback: index=>{
            index == 1 && this.$refs.alert.show({
              title: '',
              content: '已删除该好友',
              btns: ['确定'],
              callback: index=>{
                this.$router.replace({
                  name: 'home'
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .zoo-more-page{
    .blind-switch{
      display: inline-block;
    }
  }

</style>
