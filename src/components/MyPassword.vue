<template>
    <div class="my-password flex">
      <input class="flex-item" type="text" :placeholder="placeholder" v-show="isShow"
             ref="input" :value="value" @input="updateValue($event.target.value)" />
      <input class="flex-item" type="password" :placeholder="placeholder" v-show="!isShow"
             ref="input" :value="value" @input="updateValue($event.target.value)" />
      <i class="iconfont" :class="isShow?'icon-eye-open':'icon-eye-close'" @click="onEyeClick"></i>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
          value: {
            type: String,
            default: ''
          },
          placeholder: {
            type: String,
            default: ''
          }
          },
        data() {
          return {
            isShow: false,
          }
        },
        mounted(){
          this.formatValue()
        },
        methods: {
          onEyeClick(){
            this.isShow = !this.isShow;
          },
          updateValue(value){
            let fv = value.trim();
            fv != value && (this.$refs.input.value = fv);
            this.$emit('input', fv)
          },
          formatValue(){
            this.$refs.input.value = this.value || ''
          },
        }
    }
</script>

<style lang="less">
  @import "../assets/less/theme";

  .my-password{
    height: 1.4rem;
    background: @colorFFF;
    padding: 0 5px;
    input{
      border: 0;
      line-height: 1.4rem;
    }
    .iconfont{
      font-size: .7rem;
    }
  }

</style>
