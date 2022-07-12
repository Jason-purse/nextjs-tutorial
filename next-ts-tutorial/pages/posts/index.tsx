import React, {ComponentProps} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import PostApi, {PostIntroduction} from '../../lib/posts'
import Link from "next/link";

type PostsProps = {
    posts: PostIntroduction[]
}
/**
 * posts 页面
 * @param props
 * @constructor
 */
export default function Posts({posts}: PostsProps) {
    return (
        <div className="text-center">
            <h1 className="h1max marginTop30px marginBottom10px skyBlueText">这是Posts 页面</h1>
            <h2 className="marginTop10px marginBottom20px redText">所有文章如下 ....</h2>
            <article>
                {posts.map(post => {
                    return (
                        <p className="marginBottom5px">
                            <Link href={`/posts/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </p>
                    )
                })}
            </article>

            <footer className="marginTop30px">
                <Link href="../">
                    <a>返回首页</a>
                </Link>
            </footer>
        </div>
    )
}
/**
 * data fetch
 * @param context
 */
export const getStaticProps: GetStaticProps = context => {
    return {
        props: {
            posts: PostApi.getAllPostIntroductions()
        }
    }
}

