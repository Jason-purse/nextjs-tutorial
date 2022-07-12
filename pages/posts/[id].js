import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from "../../lib/post-util";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '/styles/utils.module.scss'

/**
 * 动态路由产生的文章信息
 * @returns {JSX.Element}
 * @constructor
 */
export default function Post({postData}) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
       <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
           <br/>
           <div className={utilStyles.lightText}>
               <Date dateString={postData.date}/>
           </div>
           <br/>
           <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
       </article>
    </Layout>
}

/**
 * 通过它返回可能有效的一些动态路由的路径 ...
 * @returns {Promise<{paths: *[], fallback: boolean}>}
 */
export async function getStaticPaths() {
    console.log("获取所有可用的路径")
    // Return a list of possible value for id
    return {
        paths: getAllPostIds(),
        fallback: false
    }
}

/**
 * 根据上下文参数中的路由参数进行数据抓取
 * @param params
 * @returns {Promise<{notFound: boolean}> | Promise<?>}
 */
export async function getStaticProps({params: {id}}) {
    console.log("触发数据抓取")
    let postData = await getPostData(id);
    if (postData) {
        return {
            props: {
                postData
            }
        }
    }
    return {
        notFound: true
    }
}