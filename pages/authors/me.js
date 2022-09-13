import useSWR from 'swr'
import fetcher, {get} from "../../util/RequestUtil";

/**
 * me 通过 swr 进行客户端渲染 ...
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Me(props) {
    // 由于服务端需要先渲染一遍 ...
    // 那么默认应该是会返回 undefined ...
    const {data, error} = useSWR('/api/profile', get)
    // 所以两种条件决定了它们显示什么 ...
    if (error) {
        console.log(error)
        return <div>failed to load</div>
    }
    if (!data) {
        return <div>loading</div>
    }
    // 当有数据的时候,渲染 数据
    return (
        <div>hello {data.data}!</div>
    )
}