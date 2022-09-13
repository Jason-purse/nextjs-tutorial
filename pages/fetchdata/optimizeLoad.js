/**
 * 乐观加载...
 * @constructor
 */
import useSWR from "swr";

export default function OptimizeLoad() {


    // 模拟请求 ...
    let {data, mutate} = useSWR('/internal/optimize', null, {
        onError: error => console.log("error " + error)
    })

    return (
        <>
            <div>
                <h1>输入信息修改用户信息,并乐观更新,如果输入特定关键字,包括,并回滚上次的数据</h1>
                <input type="text" onChange={event => event.target.value = event.target.value.trim()}
                       onKeyUp={event => {
                           if (event.code === 'Enter') {
                               // 然后触发修改
                               mutate(async () => {
                                   return new Promise((resolve, reject) => {
                                       var value = event.target.value;
                                       if (value === 'error') {
                                           reject('error')
                                           return;
                                       }
                                       setTimeout(() => {
                                           resolve(value)
                                       }, 1000)
                                   })
                               }, {
                                   optimisticData: event.target.value,
                                   rollbackOnError: false
                               }).catch(error => {
                                   console.log("error" + error)
                               })
                           }
                       }}/>


                <p>以下显示修改的用户名称</p>
                {data || '加载中'}
            </div>
        </>
    )
}