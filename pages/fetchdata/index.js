function Blog({posts}) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.title}>{post.title}</li>
            ))}
        </ul>
    )
}

export default Blog

/**
 *
 * @param params   路由参数,详情参考  动态路由文档
 * @param preview    预览模式(true,预览模式文档)
 * @param previewData    预览数据(setPreviewData 预览模式文档)
 * @param locale       (启用了国际化路由, 当前激活的路由)
 * @param locales      (所有支持的locale)
 * @param defaultLocale    (国际化路由默认配置locale)
 * @return {Promise<{props: {posts: any}}>}
 *
 * This function gets called at build time on server-side.
 *
 * when should I use it
 * The data required to render the page is available at build time ahead of a user’s request.
 * The data comes from a headless CMS.
 * The data can be publicly cached (not user-specific).
 * The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
 *
 * 它可能是部分的静态数据 ....
 */
let count = 0;
export async function getStaticProps({params, preview, previewData, locale, locales, defaultLocale}) {
    const result = await import("../api/blog").then(({results}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                results.push({title: `${count ++}`})
                resolve({
                    props: {
                        posts: results
                    },
                    revalidate: 10
                })
            },count * 10000);
        })

    }).catch(error => {
        return Promise.resolve({
            props: null,
            notFound: true
        })
    })
    console.log("request handle acquire ...")
    return result
    // 调用外部 API 获取博文列表
    // 内部api 路由数据,应该直接import,仅仅只需要重构一下代码即可 ...
    // const res = await fetch("/api/hello")
    //
    // const posts = await res.json()

    // 通过返回 { props: { posts } } 对象，Blog 组件
    // 在构建时将接收到 `posts` 参数
    // return {
    //     props: {
    //         posts,
    //     },
    //     // 可选参数,为false, 表示页面不需要重新验证,将会被缓存直到下一次构建...  增量静态生成了解更多...
    //     revalidate: false,
    //     // 可选参数,例如没有找到数据的时候可以返回404...,否则返回页面 ...     查看下面一个函数实例
    //     // 这个参数 不需要fallback:false 模式,因为从getStaticPaths中返回的路径才会被预渲染 ...
    //     notFound: false ,
    //     // 可选参数,允许重定向到内部以及外部资源 ...
    //     // 它应该匹配{ destination: string, permanent: boolean } 类型
    //     // 有些时候你可能需要设置statusCode 来正确的为旧的Http客户端重定向 ...
    //     // 你能够使用statusCode 替代permanent属性 (例如临时重定向 / 而不是永久重定向) ..
    //     // redirect: false,
    //
    // }
}

// 例如 export async function getStaticProps(context) {
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()
//
//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }
//
//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }
