import requestClient from "./RequestClient";

export default function fetcher(...args) {
    return fetch(...args).then(res => res.json())
}

export function get(url, queryParams = {}) {
    return requestClient(url, {method: 'get', params: queryParams})
}

export function post(url, body, params = {}) {
    return requestClient.post(url, body, {params})
}

export function put(url, body) {
    return requestClient.put(url, body)
}

export function del(url, params = {}, data = {}) {
    return requestClient.delete(url, {params, data})
}
// 测试 error request
export function error(url, params, data, method) {
    return new Promise((resolve, reject) => {
        reject('error test')
    })
}

