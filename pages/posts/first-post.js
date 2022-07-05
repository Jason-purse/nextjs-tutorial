import Layout from "../../components/layout";
import './first-post.module.scss'

export default function FirstPost() {
    return (
        <Layout>
            <div className="first-post">
                <h1 className="item">First Post</h1>
                <p>这是一个存在的社区值</p>
            </div>
        </Layout>
    )
}