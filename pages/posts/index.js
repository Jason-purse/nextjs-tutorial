import Link from "next/link";
import utilStyle from '/styles/utils.module.scss'
import Date from "../../components/date";
export default function Posts(props) {
    return (
        <div className={`${utilStyle.headingMd} ${utilStyle.padding1px}`} style={{textAlign: "center"}}>
            <h1 className={utilStyle.headingLg}>所有的posts</h1>
            <ul className={utilStyle.list}>
                {
                    props.data.map(post => {
                        return (
                            <li key={post.id} className={utilStyle.listItem}>
                                <Link href={`posts/${post.id}`}>
                                    <a>{post.title} | {post.date}</a>
                                </Link>
                                <br/>
                                <small className={utilStyle.lightText}>
                                    <Date dateString={post.date} />
                                </small>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export async function getStaticProps(content) {
    return await import("../../lib/post-util").then(({getAllPostIndexs}) => {
        return Promise.resolve({
            props: {
                data: getAllPostIndexs()
            }
        })
    }).catch(error => {
        console.log(`route posts getStaticProps occur question: ${error}`)
        return Promise.resolve({
            notFound: true
        })
    })
}