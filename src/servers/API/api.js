/**
 * Created by Administrator on 2017/1/4.
 */

import urls from 'servers/urls'
import tempLoading from 'utils/tempLoading'
import axios from 'axios'

const AxiosData = (type, data, title, tempShow=true)=>{

  tempShow && tempLoading.start(title);
  return new Promise((resolve, reject)=>{
    /!*test demo start*!/
    setTimeout(()=>{
      tempShow && tempLoading.end();
      resolve(null);
    }, 1000)
    return;
    /!*test demo end*!/

    let url = urls[type];
    axios.get(url)
      .then(response => {
        tempShow && tempLoading.end();
        resolve(response.data);
      })
      .catch(function(e){
        tempShow && tempLoading.end();
        reject(e.message);
      })
  });
}

module.exports = {
  AxiosData,
}
