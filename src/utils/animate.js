/**
 * Created by Administrator on 2017/3/15.
 */
const animate = (option)=>{
  let defval = {
    start:0,
    end:0,
    current:0,
    duration: 500,//ms
    callback: ()=>{},
  };
  let time = 20;
  Object.assign(defval, option)

  let arrow = defval.start > defval.end;
  if(defval.current == defval.end){
    defval.callback(defval.end)
  }

  let mt =  (defval.end-defval.start)/(defval.duration/time);

  let ani_int = setInterval(()=>{
    if((!arrow && defval.current >= defval.end) || (arrow && defval.current<= defval.end)){
      defval.callback(defval.end, true);
      clearInterval(ani_int)
    }else{
      defval.current += mt;
      defval.callback(defval.current)
    }
  }, time)
}
export default animate;
