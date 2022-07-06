import React from "react";
import {promises as fs} from 'fs'
import path from 'path'

export default function ReadFile({posts}) {
    return (
            <div>
                <h1>尝试读取文件系统上的文件信息展示 ...</h1>
                <hr/>
                <h1>以下是文章列表</h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post.filename}>
                            <h3>{post.filename}</h3>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
    )

}
/**
 * 一个 服务器端构建时的调用函数 ...
 * 生产环境下,每一个getStaticProps都会调用
 *
 * 说白了 也就是请求这个页面之前,进行的预渲染 ...
 * @param context
 * @return {Promise<{props: {posts: [{filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}, {filename: string, content: string}]}}>}
 */
export const getStaticProps = async (context) => {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = await fs.readdir(postsDirectory)
    const posts = filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')

        // Generally you would parse/transform the contents
        // For example you can transform markdown to HTML here

        return {
            filename,
            content: fileContents,
        }
    })

    return {
        props: {
            posts: await Promise.all(posts),
        },
    }
}
