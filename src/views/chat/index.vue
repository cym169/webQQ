<template>
  <div v-title="'聊天'" class="chat-page container has-header " :class="{'ismore': moreFlag}" >
    <my-header @leftClick="onLeftClick">
      <div slot="left" class="inline-row">
        <i class="item iconfont icon-arrowleft"></i>
        <span class="item">消息({{info.count}})</span>
      </div>
      <div slot="title">
        <div v-text="info.nickname"></div>
        <div class="chat-header-loginsta" v-text="info.loginsta" v-if="type==1"></div>
      </div>
      <div slot="right" class="chat-header-btns" v-if="type==1">
        <i class="iconfont icon-phone1" @click="onPhoneClick"></i>
        <i class="iconfont icon-man" @click="onManClick"></i>
      </div>
    </my-header>

    <chat-body ref="chatbody" :items="items" :type="type" @loading="onLoading" @imgclick="onImgClick"></chat-body>

    <chat-edit :id="id" @alert="onAlert" @send="onSend" @more="onMoreChang"></chat-edit>

    <image-view ref="imageview"></image-view>

    <action-sheet ref="actionsheet"></action-sheet>

    <alert ref="alert"></alert>

  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader';
  import Alert from 'components/Alert';
  import ActionSheet from 'components/ActionSheet';
  import ImageView from 'components/ImageView';
  import ChatBody from 'components/chat/ChatBody';
  import ChatEdit from 'components/chat/ChatEdit';

  import { chatFriendHistory, chatGroupHistory } from 'servers/API/chat';

  export default {
    components: {
      MyHeader,
      Alert,
      ActionSheet,
      ImageView,
      ChatBody,
      ChatEdit,
    },
    props: {},
    data(){
      return {
        id: this.$route.params.id,
        type: this.$route.params.type+'' || '1',//1-friend,2-group
        moreFlag: false,
        myinfo: {},
        info:{},
        items: [],
      }
    },
    mounted(){
      if(this.id){
        this.$store.commit('update_chatinfo', {
          id: this.id,
          type: this.type,
        })
      }

      let { id,type } = this.$store.getters.getChatInfo;
      this.id = id;
      this.type = type;

      this.myinfo = this.$store.getters.getUserInfo;
      this.getHistory(()=>{
        this.$refs.chatbody.moveToEnd();
      })
    },
    methods: {
      onLeftClick(){
        this.$router.back()
      },
      onPhoneClick(){
        this.$refs.actionsheet.show({
          title:'你可以选择以下通话操作',
          btns: ['QQ电话', '视频电话'],
          callback: index=>{
            if(index == 0){
              this.$refs.alert.show({
                title: '',
                content: '此处进行语音电话',
                btns: ['确定']
              })
            }else if(index == 1){
              this.$refs.alert.show({
                title: '',
                content: '此处进行视频电话',
                btns: ['确定']
              })
            }
          }
        })
      },
      onManClick(){
        this.$router.push({
          name: 'chat/setting',
          params: {
            id: this.id
          }
        })
      },
      onAlert(option){
        this.$refs.alert.show(option)
      },
      onMoreChang(flag){
        this.moreFlag = flag
        flag && this.$refs.chatbody.moveToEnd()
      },
      onLoading(){
        if(this.type == 1){
          chatFriendHistory({id: this.id}).then(res=>{
            for(let key in res.data){
              res.data[key].headimg = res.data[key].isme ?  this.myinfo.headimg : this.info.headimg
            }
            this.items = [...res.data, ...this.items];
            this.$refs.chatbody.reset();
            this.$refs.chatbody.moveToTop();
          })
        }else if(this.type == 2){
          chatGroupHistory({id: this.id}).then(res=>{
            for(let key in res.data){
              res.data[key].isme &&  (res.data[key].lvltxt = this.info.mylvltxt, res.data[key].level = this.info.mylevel, res.data[key].headimg = this.myinfo.headimg, res.data[key].nickname = this.myinfo.nickname)
            }
            this.items = [...res.data, ...this.items];
            this.$refs.chatbody.reset();
            this.$refs.chatbody.moveToTop();
          })
        }
      },
      getHistory(callback){
        if(this.type == 1){
          chatFriendHistory({id: this.id}).then(res=>{
            for(let key in res.data){
              res.data[key].headimg = res.data[key].isme ?  this.myinfo.headimg : res.info.headimg
            }
            this.info = res.info;
            this.items = res.data;
            callback()
          })
        }else if(this.type == 2){
          chatGroupHistory({id: this.id}).then(res=>{
            for(let key in res.data){
              res.data[key].isme &&  (res.data[key].lvltxt = res.info.mylvltxt, res.data[key].level = res.info.mylevel, res.data[key].headimg = this.myinfo.headimg, res.data[key].nickname = this.myinfo.nickname)
            }
            this.info = res.info;
            this.items = res.data;
            callback()
          })
        }
      },
      onSend(params){
        let type = params.type;
        let nickname = this.type == 2 ? this.myinfo.nickname : '';
        let data = {
          isme: true,
          headimg: this.myinfo.headimg,
          nickname
        }
        this.type == 2 && (data.level = this.info.mylevel, data.lvltxt = this.info.mylvltxt)

        if(type == 'imgs'){
          for(let key in params.message){
            this.items.push({
              isme: true,
              headimg: this.myinfo.headimg,
              img: params.message[key],
              nickname,
              level: this.type == 2 ? this.info.mylevel : '',
              lvltxt: this.type == 2 ? this.info.mylvltxt : ''
            })
          }
        }else{
          if(type == 'text'){
            data.message = params.message
          }else if(type == 'voice'){
            data.message = params.message
          }else if(type == 'emoji'){
            data.emoji = params.message.src
          }
          this.items.push(data)
        }
        this.$refs.chatbody.moveToEnd();
      },
      onImgClick(index){
        let current = 0,
            imgs = [];
        for(var i=0; i<this.items.length; i++){
          this.items[i].img && imgs.push(this.items[i].img);
          index == i && (current = imgs.length-1)
        }
        this.onImageView(current, imgs)
      },
      onImageView(current, imgs){
        this.$refs.imageview.show({
          current,
          imgs
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-page{
    padding-bottom: 2.4rem;
    &.ismore{
      padding-bottom: 7.3rem;
    }
    .chat-header-loginsta{
      font-size: .3rem;
      color: @colorFFF;
    }
    .myheader{
      .chat-header-btns{
        .iconfont{
          font-size: 1rem;
          line-height: 1.2rem;
        }
      }
    }
  }
</style>
