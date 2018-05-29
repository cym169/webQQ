<template>
  <div class="chat-edit-emoji">
    <div class="edit-emoji-imgs inline-row">
      <div class="item" v-for="(item, index) in items" @click="onItemClick(index)">
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {},
    data() {
      return {
        items: [],
      }
    },
    mounted(){
      let len = Math.round(Math.random()*20+20);
      for(let i=0; i<len; i++){
        this.items.push({
          unicode: '&#e400001',
          src: require('assets/emoji/emoji_&#e400001.png'),
        })
      }
    },
    methods: {
      onItemClick(index){
        this.$emit('send', {
          type: 'emoji',
          message: this.items[index]
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/theme";

  .chat-edit-emoji{
    width: 100%;
    height: 100%;
    .edit-emoji-imgs{
      height: 100%;
      text-align: left;
      overflow: auto;
      padding: .2rem;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      .item{
        width:.9rem;
        height: .9rem;
        margin: .19rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
