<template>
    <div class="my-input flex">
        <input class="flex-item" type="tel" v-if="type=='phone'" :placeholder="placeholder" v-focus="focus"
            ref="input" :value="value" @input="updateValue($event.target.value)" @focus="onFocus" @blur="onBlur" />
        <input class="flex-item" type="password" v-else-if="type=='password'" :placeholder="placeholder" v-focus="focus"
            ref="input" :value="value" @input="updateValue($event.target.value)" @focus="onFocus" @blur="onBlur" />
        <input class="flex-item" type="text" v-else :placeholder="placeholder" v-focus="focus"
            ref="input" :value="value" @input="updateValue($event.target.value)" @focus="onFocus" @blur="onBlur" />
        <i class="iconfont icon-delete delete" :class="{'active':isClear}" @click="onClearClick"></i>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
          focus: {
            type: Boolean,
            default: false,
          },
          type: {
            type: String,
            default: 'text'
          },
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
            isClear: false
          }
        },
        mounted(){
          this.formatValue();
        },
        methods:{
          updateValue(value){
            let fv = value.trim();
            fv != value && (this.$refs.input.value = fv);
            this.isClear = fv != '';
            this.$emit('input', fv)
          },
          onBlur(){
            this.isClear = false;
            this.$emit('change', this.value)
          },
          formatValue(){
            this.$refs.input.value = this.value || ''
          },
          onFocus(event){
            this.isClear = this.value != ''
            this.selectAll(event);
          },
          selectAll(event){
            setTimeout(()=>{
              event.target.select();
            }, 0)
          },
          onClearClick(){
            this.$refs.input.value = ''
            this.isClear = false
            this.$emit('input', '')
            this.$emit('clear')
          }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/theme";

  .my-input{
    height: 1.4rem;
    background: @colorFFF;
    padding: 0 5px;
    input{
      border: 0;
      line-height: 1.4rem;
    }
  }
</style>
