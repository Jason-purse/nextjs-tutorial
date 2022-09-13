/**
 * 纯的 ...
 * @constructor
 */
import useSWRInfinite from "swr/infinite";
import {get} from "../../util/RequestUtil";

export default function PureInfiniteComponent() {

    // 类似于递归写法的 ...
    // 也就是我们仅仅只需要考虑 最后一个条件 / 否则正常返回key即可 ...
    let {data, size, setSize, isValidating} = useSWRInfinite((index, previousPageData) => {
            // 如果 前一页的数据 为空 ...(但是是已经请求过的) ...
            if (previousPageData && !(previousPageData?.data.length)) {
                // console.log(`previousPageData ${previousPageData}`)
                return null
            } // reached the end


            // 查询当前页信息 ...
            // 其实每一页都查询了,但是有缓存,所以没有继续请求 ...
            return `/api/page?page=${index + 1}&pageSize=10`                // SWR key
        }
        , args => {
            // return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     get(args).then(data => {
            //         resolve(data)
            //     }).catch(error => {
            //         reject(error)
            //     })
            // }, 2000)

            // })
            return get(args)
        })


    if (!data) return 'loading'


    // revalidate ... 请求过程中, isValidating ....
    console.log(isValidating)
    // 我们现在可以计算出所有用户的数量
    let totalUsers = 0
    for (let i = 0; i < data.length; i++) {
        totalUsers += data[i].data.length
    }

    return <div>
        <p>{totalUsers} users listed</p>
        {totalUsers === 0 ? <div>no data</div> : data.map((users, index) => {
            // `data` 是每个页面 API 响应的数组。
            return users.data.map((user, key) => <div key={key}>{user}</div>)
        })}
        <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
}