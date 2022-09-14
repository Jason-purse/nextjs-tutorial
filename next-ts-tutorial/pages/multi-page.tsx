import {PropsWithChildren, ReactElement, ReactNode, useState} from "react";
import Layout from "../components/layout";
import Link from "next/link";

export default function MultiLayoutPage({children}: PropsWithChildren<any>) {
        let [state,setState] = useState<any>()
    return (
        <>
            // 返回内容 ...
            {count}
            <br/>
            <button onClick={event => {
                // 这一部分是在客户端使用的(完全可以,让它记住) ...
                // 虽然这种方式不是很好,但是如果服务端不刷新 ... 那么就能保留数据状态 ...
                count++;
                setState({count})
            }}>click me
            </button>
            <Link href="/">
                <a>首页</a>
            </Link>
        </>
    )
}

let count = 0;

/**
 * 会调用这个函数为每一个Page 返回一个layout
 * @param page
 */
MultiLayoutPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}