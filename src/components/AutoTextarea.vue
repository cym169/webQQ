<template>
  <div class="auto-textarea">
    <textarea ref="textarea" :value="value" :placeholder="placehodler" :rows="rows" @input="onInput($event.target.value)"></textarea>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      placehodler: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
      defrows: {
        type: Number,
        default: 1,
      },
      maxrows: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        rows: 1,
        info: {
          fontsize: 14,
          width: 0,
        }
      }
    },
    watch: {
      value(){
        let rows = this.getRows(this.value);
        rows >= this.defrows && rows<=this.maxrows && (this.rows = rows);
      }
    },
    mounted(){
      this.rows = this.defrows;
      this.info.width = this.$refs.textarea.offsetWidth;
      let size = .5*window.REM_SIZE;
      this.info.fontsize = size < 12 ? 12 : size;
    },
    methods: {
      onInput(value){
        this.$emit('input', value);
      },
      getRows(value){
        let rows = 0;
        let arr = value.split('\n');
        rows += arr.length;
        for(let key in arr){
          rows += this.getTextRows(arr[key]);
        }
        return rows;
      },
      getTextRows(value){
        let count = 0;
        let arr = value.split('');
        for(let key in arr){
          if(/[\u4e00-\u9fa5]/.test(arr[key])){
            count += 2
          }else{
            count += 1
          }
        }
        let width = count/2*this.info.fontsize*1.025;
        return Math.floor(width/this.info.width)
      }
    }
  }
</script>

<style lang="less">
  .auto-textarea{
    textarea{
      width: 100%;
    }
  }
</style>
