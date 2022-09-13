/**
 * 请求组件适配器
 */

import axios from 'axios'

const requestClient = axios.create({});

requestClient.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        return Promise.reject(response.data.message)
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error?.response?.data?.message || error);
});

export default requestClient;


