/**
 * api模块接口列表
 */
import apiFunction from 'gw-base-api/apiFunction';
import model from './api/modelEquip';

const api = Object.assign(
    {},
    apiFunction,
    model
);

export default api;
