/**
 * Created by Administrator on 2017/1/6.
 */

class tempLoading {
    constructor(){
      this._$loading = null;
      this._init()
    }
    _init(){
      let $loading = document.getElementById('loading_mask');
      if(!$loading){
        $loading = document.createElement('div');
        $loading.id = 'loading_mask';
        $loading.style.display = 'none';
        $loading.innerHTML = `<div class="mask content text-center">
          <div class="bar"></div>
          <div class="button btn-black-opa inline-row">
            <i class="item icon-loading"></i>
            <span class="item">加载中</span>
          </div>
        </div>`;
        document.body.appendChild($loading);
      }
      this._$loading = $loading;
    }
    start(title){
      title = title || '加载中';
      this._$loading.getElementsByTagName('span')[0].innerHTML = title;
      this._$loading.style.display = 'block';
    }
    end(){
      this._$loading.style.display = 'none';
    }
}
export default new tempLoading()
