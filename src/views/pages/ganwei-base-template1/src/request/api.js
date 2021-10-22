/**
 * api模块接口列表
 */
import apiFunction from 'gw-base-api/apiFunction';
import template from './api/template';

const api = Object.assign(
    {},
    apiFunction,
    template
);

export default api;
