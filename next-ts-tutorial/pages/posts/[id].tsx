import PostApi,{PostInfo} from "../../lib/posts"
import {GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";
type PostCompProps =  {
    post: PostInfo
}
export default function Post({post}: PostCompProps) {
    return (
        <div className="margin-left20px">
            <article>
                <h1>{post.title}</h1>
                <section className="lightGrayText" dangerouslySetInnerHTML={{__html: post.content}}/>
            </article>

            <footer className="marginTop30px">
                <Link href="../posts">
                    <a>返回</a>
                </Link>
            </footer>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    if(context.params && context.params.id) {
        return {
            props: {
                post: await PostApi.getPostInfo(context.params.id as string)
            } as PostCompProps
        }
    }
   return {
        notFound: true
   }
}

export const getStaticPaths: GetStaticPaths = async context => {
    return PostApi.getAllPostIds()
}