<template>
    <div class="account-list">
      <account-item v-for="(item, index) in items" :key="item.id" :data="item" :style="'animation-delay:'+(index*.1)+'s','-webkit-animation-delay:'+(index*.1)+'s'" @account="onAccountClick(index)" @delete="onItemDelete(index)"></account-item>
    </div>
</template>

<script>
    import AccountItem from './AccountItem';
    export default {
      components: {
        AccountItem,
      },
      props: {
        items: Array,
      },
      data() {
        return {}
      },
      methods: {
        onAccountClick(index){
          this.$emit('account', index)
        },
        onItemDelete(index){
          this.$emit('delete', index)
        }
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/animate";
  .account-list{
    max-height: 6.5rem;
    overflow: auto;
    transform-origin: 50% 0;
    animation: scaleInVertical .3s both;
    .account-item:last-child{
      border-bottom: 0;
    }
  }
</style>
