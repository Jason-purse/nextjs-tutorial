import useSWR, {useSWRConfig} from "swr";
import {get, post} from "../../util/RequestUtil";
import {useEffect, useRef, useState} from "react";

/**
 * 这个组件,测试了 revalidateOnFocus(在焦点聚焦的时候,重新发起请求) ...
 * 更新缓存数据,应该使用 mutate / 或者全局 mutate
 * 全局 mutate 本质上支持  参数 (key, function(return promise) | data,options) ..
 * 也就是说, 绑定了key的 mutate,可以直接在第二个参数上调用返回新数据的promise函数,或者直接给定函数引用,它帮你调用 ...
 * @returns {JSX.Element}
 * @constructor
 */
export default function AutoLoad() {

    let [tempContent, setTempContent] = useState("")
    let [content, setContent] = useState(undefined)
    let {data, mutate} = useSWR('/api/memory', get)


    // 例如 空字符串不会查询 ...
    // 由于useSWR 我们在mutate的时候,它会重新发起请求,但是我们并不想 ... 仅仅将它作为一个Key 标记,之后通过mutate的方式 重新发送一个请求
    let {data: saveData, mutate: saveHandle} = useSWR(['/api/memory', null, {data: ""}], post)

    let {mutate: save} = useSWRConfig()


    return (
        <div>
            <form action="" onSubmit={event => {
                event.preventDefault();
                return false;
            }}>
                <h1>填入需要保存的东西</h1>
                <input type="text" value={tempContent}
                       onChange={event => setTempContent(event.target.value)}/>
                {/*// 更新*/}
                <button onClick={event => {
                    mutate()
                }}>点击查询最新数据
                </button>
                <button onClick={event => {
                    setContent(tempContent)
                }}>点击保存写入记录
                </button>
                <button onClick={event => {
                    // save(['/api/memory', null, {data: ""}], async () => {
                    //     await  post('/api/memory', null, {data: tempContent})
                    //     mutate()
                    // }, {revalidate: true})

                    saveHandle(async () => {
                        await post('/api/memory', null, {data: tempContent})
                        // mutate()
                    }, {revalidate: false})
                }}>
                    刷新
                </button>
                <h2>服务器保存的结果</h2>
                <input type="text" value={data} readOnly/>
            </form>
        </div>
    )
}