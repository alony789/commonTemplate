/**
 * api模块接口列表
 */
import apiFunction from 'gw-base-api/apiFunction';
import test from './api/test';

const api = Object.assign(
    {},
    apiFunction,
    test
);

export default api;
