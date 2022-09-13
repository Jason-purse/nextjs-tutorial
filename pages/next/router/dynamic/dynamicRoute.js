import {useState} from "react";
import Link from "next/link";

export default function DynamicRouter() {
    // 之前我们就已经学习过动态路由 ...

    let [content, setContent] = useState("")
    let [multiContent,setMultiContent] = useState("")
    return (
        <>
            <input type="text" value={content} onChange={event => setContent(event.target.value)}/>
            {
                content ? <Link href={`./${content}`}>
                    <a>点击切换到用户输入的路由 ...</a>
                </Link> : <span>&nbsp;&nbsp;&nbsp;等待用户输入</span>
            }

            <br/>

            <input type="text" value={multiContent} onChange = {event=> setMultiContent(event.target.value)} />
            {
                multiContent ? <Link href={`./file/start/${multiContent}`}>
                    <a>点击切换到用户输入的路由 ...</a>
                </Link> : <span>&nbsp;&nbsp;&nbsp;等待用户输入</span>
            }
        </>
    )
}