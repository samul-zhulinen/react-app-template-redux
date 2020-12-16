import PACKAGE from '../package.json'
const VERSION = PACKAGE.version
const currentHostname = window.location.hostname;
//h5 domain
const H5_DAILY_DOAMIN = "daily.yuantutech.com";
const H5_UAT_DOMAIN = "uat.yuantutech.com";
export const H5_UAT2_DOMAIN = "//api-uat2.yuantutech.com";
const H5_ONLINE_DOMAIN = "s.yuantutech.com";
const H5_ABTEST_DOMAIN = "test.yuantutech.com";
const H5_QD_DOMAIN = "m.guahao.jkqd.gov.cn"; //在 m.guahao.jkqd.gov.cn 域名下发送请求
const H5_NGORK = 'ngrok.yuantutech.com'
const H5_PRE_DOMAIN = 's-pre.yuantutech.com' // 预发环境

//tms domain
let TMS_DAILY_DOAMIN = "//daily.yuantutech.com";
let TMS_UAT_DOMAIN = "//uat.yuantutech.com";
let TMS_ONLINE_DOMAIN = "//s.yuantutech.com";
let TMS_ABTEST_DOMAIN = "//test.yuantutech.com";

//api domain
const API_LOCAL_DOMAIN = "http://test.yuantutech.com";//本地调试域名指向
const API_DAILY_DOMAIN = "api.daily.yuantutech.com";
// let API_UAT_DOMAIN = "api-uat.yuantutech.com";
let API_UAT_DOMAIN = "route-uat.yuantutech.com";

//家庭医生
// let API_DOC_UAT_DOMAIN ="cactus-uat.yuantutech.com";
let API_DOC_UAT_DOMAIN = "jump-uat.yuantutech.com";
let API_ONLINE_DOMAIN = "route.yuantutech.com";
let API_PRE_DOMAIN = "route-pre.yuantutech.com";
let API_DOC_ONLINE_DOMAIN = "jump.yuantutech.com";
// let API_DOC_ONLINE_DOMAIN = "cactus.yuantutech.com";
const API_ABTEST_DOMAIN = "test.yuantutech.com";
const API_QD_DOMAIN = "m.guahao.jkqd.gov.cn";
//京都儿童医院
let API_HCRM_UAT_DOMAIN = 'https://dctest.yuantutech.com/hcrm';
let API_HCRM_ONLINE_DOMAIN = 'https://hcrm.yuantutech.com/hcrm';
//京都在线商城
let API_HCRM_SHOP_UAT_DOMAIN = 'https://shoptest.yuantutech.com';
let API_HCRM_SHOP_ONLINE_DOMAIN = 'https://shop.yuantutech.com';
//智能导诊
let API_DC_UAT_DOMAIN = 'https://dctest.yuantutech.com/guidance';
let API_DC_ONLINE_DOMAIN = 'https://dc.yuantutech.com/guidance';

//信用分
let DC_CREDIT_ONLINE_DOMAIN = 'credit-jump.yuantutech.com/creditscore'
//dc doamin
let DC_UAT_DOMAIN = 'dctest.yuantutech.com'
let DC_ONLINE_DOMAIN = 'dc.yuantutech.com'
let NEW_DC_ONLINE_DOMAIN = 'search.yuantutech.com'

//工单domain
const TICKTE_UAT_DOMAIN = 'https://ticket-uat.yuantutech.com'
const TICKTE_ONLINE_DOMAIN = 'https://ticket.yuantutech.com'

const AOLSEE_UAT_DOMAIN = '//aolsee-aliuat.yuantutech.com/aolsee-web';
const AOLSEE_ONLINE_DOMAIN = '//aolsee.yuantutech.com/aolsee-web';

const SERVICE_UAT_DOMAIN = 'https://dctest.yuantutech.com';
const SERVICE_ONLINE_DOMAIN = 'https://search.yuantutech.com';

const SEARCH_UAT_DOMAIN = 'http://search.yuantutech.com';
const SEARCH_ONLINE_DOMAIN = 'http://search.yuantutech.com';
//扫码进入排队叫号
const QUEUE_UAT_DOMAIN = 'http://queue.uat.yuantutech.com';
const QUEUE_ONLINE_DOMAIN = 'http://queue.uat.yuantutech.com';

// 诊疗包
const ZHENLIAOBAO_UAT_DOMAIN = '//dctest.yuantutech.com/device';
const ZHENLIAOBAO_ONLINE_DOMAIN = '//dc.yuantutech.com/device';
// const ZHENLIAOBAO_ONLINE_DOMAIN = '//dctest.yuantutech.com/device';

const IS_DAILY = currentHostname.indexOf(H5_DAILY_DOAMIN) != -1;
const IS_UAT = currentHostname.indexOf(H5_UAT_DOMAIN) != -1 || currentHostname.indexOf(H5_NGORK) != -1;
// const IS_UAT = currentHostname.indexOf(H5_UAT_DOMAIN) != -1;
const IS_ONLINE = currentHostname.indexOf(H5_ONLINE_DOMAIN) != -1;
const IS_ABTEST = currentHostname.indexOf(H5_ABTEST_DOMAIN) != -1;
const IS_QD = currentHostname.indexOf(H5_QD_DOMAIN) != -1;
const IS_PRE = currentHostname.indexOf(H5_PRE_DOMAIN) != -1;

let API_DOMAIN = API_ONLINE_DOMAIN;
//家庭医生
let API_DOC_DOMAIN = API_DOC_ONLINE_DOMAIN;
let H5_DOMAIN = H5_ONLINE_DOMAIN;
let TICKET_DOMAIN = TICKTE_ONLINE_DOMAIN;
let TMS_DOMAIN = TMS_ONLINE_DOMAIN;
let AOLSEE_DOMAIN = AOLSEE_ONLINE_DOMAIN;
let SERVICE_DOMAIN = SERVICE_ONLINE_DOMAIN;
let SEARCH_DOMAIN = SEARCH_ONLINE_DOMAIN;
let QUEUE_DOMAIN = QUEUE_ONLINE_DOMAIN;
let ZHENLIAOBAO_DOM = ZHENLIAOBAO_ONLINE_DOMAIN;
//京都儿童医院
let API_HCRM_DOMAIN = API_HCRM_ONLINE_DOMAIN
//京都在线商城
let API_HCRM_SHOP_DOMAIN = API_HCRM_SHOP_ONLINE_DOMAIN
//智能导诊
let API_DC_DOMAIN = API_DC_ONLINE_DOMAIN
let DC_DOMAIN = DC_ONLINE_DOMAIN
let NEW_DC_DOMAIN = NEW_DC_ONLINE_DOMAIN
//信用分
let DC_CREDIT_DOMAIN = DC_CREDIT_ONLINE_DOMAIN

// 问诊
const API_CONSULT_UAT = '//route-uat.yuantutech.com'

const API_CONSULT_ONLINE = '//route-internet.yuantutech.com'
let API_CONSULT = API_CONSULT_ONLINE

// 支付监控
const API_PAYMONITOR_UAT = 'paymonitor-jump-uat.yuantutech.com/paymonitor'
const API_PAYMONITOR_ONLINE = 'paymonitor-jump.yuantutech.com/paymonitor'
let API_PAYMONITOR = API_PAYMONITOR_UAT


if (IS_DAILY) {
  API_DOMAIN = API_DAILY_DOMAIN;
  H5_DOMAIN = H5_DAILY_DOAMIN;
  API_DOC_DOMAIN = API_DOC_UAT_DOMAIN;
  API_HCRM_DOMAIN = API_HCRM_UAT_DOMAIN;
  API_HCRM_SHOP_DOMAIN = API_HCRM_SHOP_UAT_DOMAIN;
  TICKET_DOMAIN = TICKTE_UAT_DOMAIN;
  TMS_DOMAIN = TMS_DAILY_DOAMIN;
  AOLSEE_DOMAIN = AOLSEE_UAT_DOMAIN;
  SEARCH_DOMAIN = SEARCH_UAT_DOMAIN;
  SERVICE_DOMAIN = SERVICE_UAT_DOMAIN;
  API_DC_DOMAIN = API_DC_UAT_DOMAIN;
  ZHENLIAOBAO_DOM = ZHENLIAOBAO_UAT_DOMAIN
  DC_DOMAIN = DC_UAT_DOMAIN
} else if (IS_QD) {
  API_DOMAIN = API_QD_DOMAIN;
  H5_DOMAIN = H5_ONLINE_DOMAIN;
  TICKET_DOMAIN = TICKTE_UAT_DOMAIN;
  AOLSEE_DOMAIN = AOLSEE_UAT_DOMAIN;
  QUEUE_DOMAIN = QUEUE_UAT_DOMAIN;
} else if (IS_QD) {
  API_DOMAIN = API_QD_DOMAIN;
  H5_DOMAIN = H5_ONLINE_DOMAIN;
  TICKET_DOMAIN = TICKTE_UAT_DOMAIN;
  QUEUE_DOMAIN = QUEUE_UAT_DOMAIN;
} else if (IS_UAT) {
  API_DOMAIN = API_UAT_DOMAIN;
  //家庭医生
  API_DOC_DOMAIN = API_DOC_UAT_DOMAIN;
  API_DC_DOMAIN = API_DC_UAT_DOMAIN;
  // API_DOMAIN = API_ABTEST_DOMAIN;
  H5_DOMAIN = H5_UAT_DOMAIN;
  //京都儿童医院
  API_HCRM_DOMAIN = API_HCRM_UAT_DOMAIN;
  API_HCRM_SHOP_DOMAIN = API_HCRM_SHOP_UAT_DOMAIN;
  TICKET_DOMAIN = TICKTE_UAT_DOMAIN;
  TMS_DOMAIN = TMS_UAT_DOMAIN;
  AOLSEE_DOMAIN = AOLSEE_UAT_DOMAIN;
  SEARCH_DOMAIN = SEARCH_UAT_DOMAIN;
  SERVICE_DOMAIN = SERVICE_UAT_DOMAIN;
  QUEUE_DOMAIN = QUEUE_UAT_DOMAIN;
  ZHENLIAOBAO_DOM = ZHENLIAOBAO_UAT_DOMAIN;
  DC_DOMAIN = DC_UAT_DOMAIN
  API_CONSULT = API_CONSULT_UAT
} else if (IS_ABTEST) {
  API_DOMAIN = API_ABTEST_DOMAIN;
  H5_DOMAIN = H5_ABTEST_DOMAIN;
  TICKET_DOMAIN = TICKTE_UAT_DOMAIN;
  TMS_DOMAIN = TMS_ABTEST_DOMAIN;
  AOLSEE_DOMAIN = AOLSEE_UAT_DOMAIN;
  SEARCH_DOMAIN = SEARCH_UAT_DOMAIN;
  SERVICE_DOMAIN = SERVICE_UAT_DOMAIN;
  QUEUE_DOMAIN = QUEUE_UAT_DOMAIN;
} else if (IS_PRE) {
  API_DOMAIN = API_PRE_DOMAIN;
  API_CONSULT = '//' + API_PRE_DOMAIN
} else {
  API_DOMAIN = API_ONLINE_DOMAIN;
  API_DOC_DOMAIN = API_DOC_ONLINE_DOMAIN;
  API_HCRM_DOMAIN = API_HCRM_ONLINE_DOMAIN
  API_HCRM_SHOP_DOMAIN = API_HCRM_SHOP_ONLINE_DOMAIN
  API_DC_DOMAIN = API_DC_ONLINE_DOMAIN;
  H5_DOMAIN = H5_ONLINE_DOMAIN;
  TICKET_DOMAIN = TICKTE_ONLINE_DOMAIN;
  TMS_DOMAIN = TMS_ONLINE_DOMAIN;
  AOLSEE_DOMAIN = AOLSEE_ONLINE_DOMAIN;
  SEARCH_DOMAIN = SEARCH_ONLINE_DOMAIN;
  SERVICE_DOMAIN = SERVICE_ONLINE_DOMAIN;
  ZHENLIAOBAO_DOM = ZHENLIAOBAO_ONLINE_DOMAIN;
  DC_DOMAIN = DC_ONLINE_DOMAIN
  API_CONSULT = API_CONSULT_ONLINE
  DC_CREDIT_DOMAIN = DC_CREDIT_ONLINE_DOMAIN
  API_PAYMONITOR = API_PAYMONITOR_ONLINE
}


const userWebApiDomain = localStorage.getItem('userWebApiDomain')
const TRANSFER = `${TMS_DOMAIN}/tms/h5/transfer.php?`


if (userWebApiDomain) {
  API_DOMAIN = userWebApiDomain
}

let PROTOCOL = 'https://'
let config = {
  VERSION,
  IS_DAILY,
  IS_UAT,
  IS_ONLINE,
  IS_ABTEST,
  PROTOCOL,
  API_DOMAIN,
  API_DOC_DOMAIN,
  API_HCRM_DOMAIN,
  API_HCRM_SHOP_DOMAIN,
  API_DC_DOMAIN,
  H5_DOMAIN,
  TMS_DOMAIN,
  TICKET_DOMAIN,
  AOLSEE_DOMAIN,
  SEARCH_DOMAIN,
  SERVICE_DOMAIN,
  QUEUE_DOMAIN,
  ZHENLIAOBAO_DOM,
  DC_DOMAIN,
  API_CONSULT,
  DC_CREDIT_DOMAIN,
  NEW_DC_DOMAIN,
  API_PAYMONITOR,
  TRANSFER
}

export {
  VERSION,
  IS_DAILY,
  IS_UAT,
  IS_ONLINE,
  IS_ABTEST,
  PROTOCOL,
  API_DOMAIN,
  API_DOC_DOMAIN,
  API_HCRM_DOMAIN,
  API_HCRM_SHOP_DOMAIN,
  API_DC_DOMAIN,
  H5_DOMAIN,
  TMS_DOMAIN,
  TICKET_DOMAIN,
  AOLSEE_DOMAIN,
  SEARCH_DOMAIN,
  SERVICE_DOMAIN,
  QUEUE_DOMAIN,
  ZHENLIAOBAO_DOM,
  DC_DOMAIN,
  API_CONSULT,
  DC_CREDIT_DOMAIN,
  NEW_DC_DOMAIN,
  API_PAYMONITOR,
  TRANSFER
}
export default config
