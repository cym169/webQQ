/**
 * Created by Administrator on 2017/4/1.
 */

//滚动位置
const getScrollTop = element=>{
  return element ? element.scrollTop : 0
}
//可视区域高度
const getVisibleHeight = element=>{
  return element ? element.offsetHeight : 0
}
//滚动高度
const getScrollHeight = element=>{
  return element ? element.scrollHeight : 0
}

//滚动位置
const scrollPosition = (element, m_y)=>{
  let scroll_top = getScrollTop(element);
  if(scroll_top == 0 && m_y > 0){
    return 'top'
  }
  let visible_height = getVisibleHeight(element),
    scroll_height = getScrollHeight(element);
  if(scroll_height == visible_height+scroll_top){
    return 'bottom'
  }
  return 'body'
}

//滚动到顶部位置
const scrollToTop = element=>{
  element && (element.scrollTop = 0)
}

//滚动到底部位置
const scrollToEnd = element=>{
  if(!element){return}
  let visible_height = getVisibleHeight(element),
    scroll_height = getScrollHeight(element);
  scroll_height > visible_height && (element.scrollTop = scroll_height-visible_height)
}

//是否含有某个class
const hasClass = (element, clsname)=>{
  let cls = element.className.split(' ');
  for(let key in cls){
    if(cls[key] == clsname){
      return true
    }
  }
  return false
}

//是否点击在某个class内
const isElement = (element, clsname)=>{
  while(element && element.tagName.toUpperCase() != 'HTML' ){
    if(hasClass(element, clsname)){
      return element
    }else{
      element = element.parentNode
    }
  }
  return false
}

module.exports = {
  getScrollTop,
  getVisibleHeight,
  getScrollHeight,
  scrollPosition,
  hasClass,
  isElement,
  scrollToTop,
  scrollToEnd,
}
