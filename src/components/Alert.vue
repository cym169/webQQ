<template>
    <confirm ref="confirm">
      <div slot="content" >
        <div class="title" v-text="data.title" v-if="data.title"></div>
        <div class="alert-cnt" v-text="data.content"></div>
      </div>
    </confirm>
</template>

<script>
    import Confirm from './Confirm';
    export default {
      components: {
        Confirm,
      },
      props: {},
      data() {
        return {
          data:{
            title: '注意',
            content: '注意内容',
            callback: ()=>{},
          }
        }
      },
      methods: {
        show(options){
          options && Object.assign(this.data, options);
          this.$refs.confirm.show(this.data)
        },
      }
    }
</script>

<style lang="less">
  .alert-cnt{
    padding: .4rem 0;
  }
</style>
