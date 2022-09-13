import useSWR from "swr";
import {get} from "../../util/RequestUtil";

export default function DurationLoad() {

    let {data, mutate} = useSWR('/api/memory', get, {
        // refreshInterval: 500, onSuccess: data => {
        //     console.log("处理..")
        // },
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,

        // 在挂载的时候已经存在旧的数据的时候, 不自动进行数据更新
        fallbackData: "123"
    })

    return (
        <div>
            <h1>控制台每隔5秒打印一次日志 ...</h1>
            <div>{data}</div>

            <button onClick={event => mutate()}>触发修改</button>
        </div>
    )
}