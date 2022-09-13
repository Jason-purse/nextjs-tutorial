/**
 * route introduction ...
 * @constructor
 */
import Link from "next/link";

export default function RouteIntroduction() {
    return (
        <div>
            <h1>Routing</h1>
            <p>next.js 有一个基于文件系统的路由(它依赖于Pages的概念)</p>
            <p>when a file is added to the `pages` directory &nbsp; it&apos;s automatically available as a route</p>


            <h2>index routes</h2>
            <div>
                <p>The router will automatically route files named `index` to root of the directory</p>
                <p>`page/index.js` -&gt; `/`</p>
                <p>`pages/blog/index.js` -&gt; `blog`</p>
            </div>

            <h2>Nested routes</h2>
            <div>
                <p>The router supports nested files ..
                    if you create a nested folder structure files will automatically be routed in the same way still</p>
                <ul>
                    <li>`pages/blog/first-post.js` -&gt;`blog/first-post`</li>
                    <li>`pages/dashboard/settings/username.js` -&gt;`/dashboard/settings/username`</li>
                </ul>
            </div>

            <h2>Dynamic route segments</h2>
            <div>
                <p>To match a dynamic segment,you can use the bracket syntax ... This allows you to match named
                    parameters</p>
                <ul>
                    <li>
                        `pages/blog/[slug].js` -&gt; `/blog/:slug`(`/blog/hello-world`)
                    </li>
                    <li>
                        `pages/[username]/settings.js` -&gt; `/:username/settings`(`/foo/settings`)
                    </li>
                    <li>
                        `pages/post/[...all].js` -&gt; `/post/*` (`/post/2020/id/title`)
                    </li>
                </ul>
            </div>


            <h2>Linking between pages</h2>
            <p>so let us link route introduction to routerStudy route</p>
            <Link href='/next/router/routerStudy'>
                <a>
                    link to routerStudy
                </a>
            </Link>

            <h2>viewPort auto prefetch ...</h2>
            
        </div>
    )


}