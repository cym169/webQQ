/**
 * Created by Administrator on 2017/1/9.
 */

const MyPlugins = {
    install(_Vue, options){
        if(!_Vue){return false;}

        _Vue && (this.__Vue = _Vue);

        this.addDirectives()
        this.addGlobals()
    },
    addDirectives(){
        this.addDirectiveTitle();
        this.addDirectiveFocus();
    },
    addDirectiveTitle(){
        this.__Vue.directive('title', (el, binding) => {
            document.title = binding.value;
        });
    },
    addDirectiveFocus(){
        this.__Vue.directive('focus', (el, binding) => {
          if(binding.value){
            el.focus()
          }
        });
    },
    addGlobals(){
        this.addFormatNum();
    },
    addFormatNum(){
      Object.defineProperty(this.__Vue.prototype, '__formatNum', {
        get () { return (num, len=2)=>{
            num = num+'';
            if(num.length >= len){
                return num
            }else{
                let t = '';
                for(let i=len-num.length; i>0; i--) {
                    t += '0';
                }
                return t+num
            }
          }
        }
      })
    },
};

export default MyPlugins;

