<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    beforeCreate(){
      //设置rem单位的值
      let width = window.screen.availWidth;
      let rem = width/12;
      window.REM_SIZE = rem;
      document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:'+rem+'px');

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        window.DeviceStatus = true;
      }
    },
  }
</script>

<style lang="less">
  @import 'assets/css/iconfont.css';
  @import 'assets/less/main';
  @import 'assets/less/component';
</style>

