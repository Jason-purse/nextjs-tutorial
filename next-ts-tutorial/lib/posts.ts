import {GetStaticPathsResult} from "next/types";
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

// 文章目录 ...
const postDir = path.join(process.cwd(), "posts")

export type PostIntroduction = {
    id: string,
    title: string,
    date: string
}

export type PostInfo = PostIntroduction & {
    content: any | string
}
export type PostApi = {
    getAllPostIntroductions(): PostIntroduction[]
    getAllPostInfos(): PostInfo[]
    getAllPostIds(): GetStaticPathsResult
    getPostInfo(id: string): Promise<PostInfo>
}

function execute<T extends any>(action: (path: string) => T): T[] {
    let filePaths = fs.readdirSync(postDir);
    if (filePaths && filePaths.length > 0) {
        return filePaths.filter(path => path.endsWith(".md")).map(path => {
            return action(path)
        });
    }
    return []
}


const Api: PostApi = {
    /**
     * 获取所有的文章Id
     */
    getAllPostIds(): GetStaticPathsResult {
        const paths = execute(path => {
            return {
                params: {
                    id: path.replace(/\.md$/, "")
                }
            }
        })
        return {
            paths,
            fallback: false
        }
    },
    getAllPostInfos(): PostInfo[] {
        return execute(filePath => {
            let realFilePath = path.join(postDir, filePath);
            let post = fs.readFileSync(realFilePath, "utf-8");
            let matterResult = matter(post)
            return {
                id: filePath.replace(/\.md$/, ""),
                content: matterResult.content,
                ...matterResult.data
            } as PostInfo
        })
    },
    getAllPostIntroductions(): PostIntroduction[] {
        return execute(filePath => {
            let realFilePath = path.join(postDir, filePath);
            let postFile = fs.readFileSync(realFilePath);
            let matterResult = matter(postFile);
            return {
                id: filePath.replace(".md", ""),
                ...matterResult.data
            } as PostIntroduction
        })
    },
    getPostInfo(id): Promise<PostInfo> {
        let filePath = path.join(postDir, `${id}.md`);
        let content = fs.readFileSync(filePath, "utf-8");
        let matterResult = matter(content)
        return new Promise((resolve, reject) => {
            remark().use(html).process(matterResult.content).then(result => {
                resolve(
                    {
                        id: id,
                        title: matterResult.data.title,
                        date: matterResult.data.date,
                        content: result.toString()
                    } as PostInfo
                );
            }, error => {
                reject(error)
            })
        })
    }

}
export default Api