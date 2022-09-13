/**
 * 条件请求
 */
import useSWR from "swr";
import {useRef, useState} from "react";
import {get} from '../../util/RequestUtil'

/**
 * 节流
 * @param event
 */
function debounce(action) {
    let timer = null;
    return event => {
        if (timer != null) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(() => {
            action()
        }, 200)
    }
}


export default function ConditionalLoad() {
    let [authorName, setAuthorName] = useState("")
    let {data: author, mutate} = useSWR(() => authorName ? ['/api/author/friends', {author: authorName}] : null, get)
    let {data: friends} = useSWR(() => ['/api/author/friends', {authorId: author.data.id}], get)
    console.log(`authorName is ${authorName}`)
    return (
        <>
            <h1>请输入你的名称,然后回车,查看你的信息 ....</h1>
            <input type="text" placeholder="please your name !!!" onKeyUp={event => {
                if (event.code) {
                    if (event.code === 'Enter') {
                        setAuthorName(event.target.value)
                        return;
                    }
                }
                if (event.keyCode) {
                    if (event.keyCode === 13) {
                        setAuthorName(event.target.value)
                        return;
                    }
                }
            }}/>

            {/*<button onClick={debounce(() => {*/}
            {/*    // 刷新 ...*/}
            {/*    mutate()*/}
            {/*})}>刷新*/}
            {/*</button>*/}

            <button onClick={event => mutate()}>刷新
            </button>
            <div>
                <h1>下面显示作者的朋友的简单信息</h1>
                {
                    friends ? friends && <ul>
                        {(friends.data).map((ele, index) => {
                            return (<li key={index}>
                                {ele}
                            </li>);
                        })}
                    </ul> : authorName ? (author ? <div>current loading .... </div> : <div>不存在任何信息 ...</div>) :
                        <div>等待用户输入</div>
                }
            </div>
        </>
    )
}