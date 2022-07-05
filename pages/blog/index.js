function Blog({posts}) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.title}>{post.title}</li>
            ))}
        </ul>
    )
}
export default Blog
export async function getStaticProps() {

}