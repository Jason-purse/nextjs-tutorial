import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import {remark} from "remark";
import html from "remark-html";
const postsDir = path.join(process.cwd(),"posts")

/**
 * 获取所有的文章索引(也就是文章简介) ...
 */
export function getAllPostIndexs() {
    let fileNames  = fs.readdirSync(postsDir);
    let allPostsData = (fileNames || []).filter(fileName => fileName.endsWith(".md")).map(fileName => {
        const id = fileName.replace(/.md$/,"");
        const fullPath = path.join(postsDir, fileName)
        let content = fs.readFileSync(fullPath,'utf-8');
        let matterResult = matter(content);

        // 拿到title ... 以及id
        return {
            id,
            ... matterResult.data
        }
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

/**
 * 获取所有的文章的id
 * @returns {*[]}
 */
export function getAllPostIds() {
    let fileNames  = fs.readdirSync(postsDir);
    return (fileNames || []).filter(fileName => fileName.endsWith(".md")).map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md/,"")
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()
    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}