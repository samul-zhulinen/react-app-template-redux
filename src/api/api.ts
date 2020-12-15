import config from '../config';
import { axios, utils } from '@ytu-mf/h5-common'
const API_DOMAIN = config.API_DOMAIN;
const PROTOCOL = config.PROTOCOL;
const TMS_DOMAIN = config.TMS_DOMAIN;

function getAPIUri(path: any) {
  return API_DOMAIN.indexOf('http') == 0
    ? API_DOMAIN + path
    : PROTOCOL + API_DOMAIN + path;
}

const CODE_UNLOGIN = '202' // 未登录

const request = (options) => axios(options)

axios.interceptors.response.use(res => {
  if (res.data.resultCode === CODE_UNLOGIN) {
    console.log('111')
    utils.goLogin()
    return
  }
  return res.data

}, err => Promise.reject(err))

export default {
  //获取就诊人模式
  getPatientModel() {
    console.log(`${PROTOCOL}${TMS_DOMAIN}/tms/h5/special-config.php`)
    return request({
      url: `${PROTOCOL}${TMS_DOMAIN}/tms/h5/special-config.php`,
      dataType: 'jsonp'
    });
  },

  //获取病人列表
  getPatients({ unionId, corpId, patientType = 1, needDesensitize }: any) {
    return request({
      url: getAPIUri('/user-web/restapi/patient/getList'),
      dataType: 'jsonp',
      data: {
        unionId,
        corpId,
        patientType,
        needDesensitize,
      }
    })
  },

  // 获取微信appToken
  getWxAppToken(params: any) {
    return request({
      url: getAPIUri('/user-web/restapi/wechatEHC/getAppToken'),
      dataType: 'jsonp',
      data: {...params}
    })
  },

  // 获取微信电子健康卡列表
  getCardListByOpenId(params: any) {
    return request({
      url: getAPIUri('/user-web/restapi/wechatEHC/getCardListByOpenId'),
      dataType: 'jsonp',
      data: {...params}
    })
  },
};
