/* eslint-disable */
import { utils } from '@ytu-mf/h5-common'

const util = {
  ...utils,
  /**
   * 根据配置筛选模式
   * @param {Object} config
   * @param {Number} unionId
   * @param {Number} corpId
   */

  patientModel(config, unionId, corpId) {
    const { unionIds, corpIds } = config;

    let res = unionIds[unionId]
      ? corpIds[corpId]
        ? corpIds[corpId]
        : unionIds[unionId]
      : corpId
      ? corpIds[corpId]
        ? corpIds[corpId]
        : 'Patient'
      : 'Patient';

    return res;
  },
};

export default util;
