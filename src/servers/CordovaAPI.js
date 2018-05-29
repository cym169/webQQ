/**
 * Created by Administrator on 2017/4/20.
 */

const getCamera = callback=>{
  if(!window.DeviceStatus){
    callback(false, '设备不可用')
  }else{
    navigator.camera.getPicture(imageData=>{
      callback("data:image/jpeg;base64," + imageData)
    }, msg=>{
      callback(false, msg)
    }, {
      destinationType: Camera.DestinationType.DATA_URL
    })
  }
}

module.exports = {
  getCamera,
}
