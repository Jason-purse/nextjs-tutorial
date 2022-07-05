import Head from "next/head";

export default function Styling(props) {
    return (
       <>
           <Head>
               <title>css module - styling...</title>
           </Head>
           <div>
               <header>在这里学习如何使用 css module</header>
               {/*// 同样整个html 页面的一些元数据都是可以定制的*/}
           </div>
       </>
    )
}