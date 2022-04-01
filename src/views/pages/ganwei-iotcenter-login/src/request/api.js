/**
 * api模块接口列表
 */
import apiFunction from 'gw-base-api/apiFunction';
import autoPlay from './api/autoPlay';

const api = Object.assign(
    {},
    apiFunction,
    autoPlay
);

export default api;
