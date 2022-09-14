import '../styles/globals.css'
import type {AppProps} from 'next/app'
import '/styles/tutorial.css'
import Layout from '../components/layout'
import {ReactElement, ReactNode, useState} from "react";

/**
 * next.js 官方说,在页面之间变换,也能够持久化state ...
 * layout pattern 不会影响state的持久化, 背后会维护一个React 组件树 ..
 * React 能够理解那些元素改变了保留的state ...
 *
 * 背后原理 : https://reactjs.org/docs/reconciliation.html
 * React 用来理解那些元素发生了改变 ...
 *
 * 对于数据抓取,客户端,通过useEffect 或者SWR 库 ..(因为这个组件(这个组件的getLayout方法) ...不是Page ,所以不能够使用服务端 数据抓取方法)
 *
 *
 * 也就是说,所有的Page 都会通过这个函数 ...
 * @param Component 即将渲染的Page ...
 * @param pageProps pageProps ...
 * @constructor 构造器
 */
function MyApp({Component , pageProps}: AppProps  & {Component: {getLayout: (page: ReactElement) => ReactNode}}) {
    let getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    let [state,setState] = useState(1)
    return (
        <div>
            getLayout(<Component {... pageProps} />)
            <button onClick={event => setState(state => state + 1)}>click me</button>
            <div>
                {state}
            </div>
        </div>
    )
}

export default MyApp
