/**
 * api模块接口列表
 */
import apiFunction from 'gw-base-api-plus/apiFunction';
import frame from './api/frame';
const api = Object.assign(
    {},
    apiFunction,
    frame
);

export default api;