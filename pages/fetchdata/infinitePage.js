import useSWR from "swr";
import {get} from "../../util/RequestUtil";
import {useState} from "react";

export default function InfinitePage() {
    const [cnt, setCnt] = useState(1)
    const [status, setStatus] = useState(false)

    // 改造,在不使用 useSWRInfinite 的情况下 让页面能够记录总数 ...

    const [total, setTotal] = useState(0)

    // 记录已经统计过的页面 index ...
    const [pageSet] = useState([])

    const pages = []
    for (let i = 0; i < cnt; i++) {
        // 由于key 会缓存组件,那么 removePage 只对最后一页有作用 ...(但是这同样会有bug(但是这个bug可能存在于我们进行 page index的持久化,这样依赖,会同时请求几个页面的数据,那么分页的数据可能会有问题(可能没有那么多页,导致错误),所以我们只要不做
        // page的持久化就没有任何问题 ...) ...
        pages.push(<MyPage index={i + 1} key={i} reduce={count => setTimeout(() => {
            if (pageSet.indexOf(i) === -1) {
                pageSet.push(i)
                setTimeout(() => {
                    setTotal(total + count)
                })
            }
        })}
                           removePage={(status = false) => {
                               // if (status) {
                               //     pages.splice(i, 1);
                               // }
                               setTimeout(() => {
                                   setStatus(true);
                               })
                           }}/>)
    }

    return <div>
        <h1>total: {total}</h1>
        {pages}
        <button disabled={status} onClick={() => setCnt(cnt + 1)}>Load More</button>
    </div>
}

function MyPage({index, removePage, reduce}) {
    const {data, error} = useSWR(`/api/page?page=${index}`, get)
    if (!data && !error) {
        return (
            <div>
                loading ...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                load error
            </div>
        )
    }

    // if (data.data?.length === 0) {
    //     removePage(true)
    // }
    // 只要小于10 就是最后一页 ..
    if (data.data?.length < 10) {
        removePage()
    }

    // 每次都写入 .. 但是(写不写入 由我们自己决定) ...
    reduce(data.data.length)

    // ... 处理加载和错误状态
    return data.data.map((item, index) => <div key={index}>{item}</div>)
}