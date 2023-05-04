
export const config = {
    runtime: 'experimental-edge',
}
export default function Handler(req) {
    // 可能能被浏览器优化
    // return new Response()

    // 相比 res. 原生的nodejs 更快 ..
    return Response.redirect("https://www.baidu.com",302)
}