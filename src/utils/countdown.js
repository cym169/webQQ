/**
 * Created by Administrator on 2017/3/29.
 */

const countdown = (count, callback)=>{
  callback = callback || function(){};
  callback(count);
  if(count <=0 ){
    return true;
  }else{
    setTimeout(()=>{
      countdown(count-1, callback)
    }, 1000)
  }
};

export default countdown
