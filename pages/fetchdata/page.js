/**
 * page 组件 ...
 * @constructor 构造器
 */
import {get} from "../../util/RequestUtil";
import {useState} from "react";
import useSWR from "swr";

// 现在我们将组件封装,能够轻易实现 提前加载下一页的数据 ..
function PageComponent({data, error}) {
    return (
        <div>
            {data ? (data.data.length > 0 ? <ul>
                {data.data.map((ele, index) => {
                    return <li key={index}>{ele}</li>
                })}
            </ul> : <div>no data</div>) : error ? <div>no data</div> : <div>loading ...</div>}
        </div>
    )
}

export default function Page() {

    const [pageIndex, setPageIndex] = useState(1);

    // 为什么这样做 可以,是因为,useSWR 缓存了数据请求 ... 下一次渲染的时候,已经包含了这个请求的数据 ...
    // API URL 包括页面索引，它是一个 React state。
    const {data, error} = useSWR(`/api/page?page=${pageIndex}`, get);
    const {data: nextData} = useSWR(() => data && pageIndex < data.totalPage ? `/api/page?page=${pageIndex + 1}` : null, get)
    return (
        <div>
            {/*{data ? (data.data.length > 0 ? <ul>*/}
            {/*    {data.data.map((ele, index) => {*/}
            {/*        return <li key={index}>{ele}</li>*/}
            {/*    })}*/}
            {/*</ul> : <div>no data</div>) : error ? <div>no data</div> : <div>loading ...</div>}*/}
            <PageComponent {...{data, error}} />
            {/*<div style={{display: 'none'}}>*/}
            {/*    <PageComponent data={nextData}/>*/}
            {/*</div>*/}

            <button disabled={pageIndex <= 1} onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <button disabled={!data || data?.totalPage <= pageIndex} onClick={() => setPageIndex(pageIndex + 1)}>Next
            </button>
        </div>
    )

}


