import Link from "next/link";

export default function Index(props: any) {
    return (
        <div className="text-center">
            <div className="text-center marginTop10px marginBottom10px">
                <Link href="posts">
                    <a className="h1max">所有文章</a>
                </Link>
            </div>
            <p> welcome to next.js app</p>
        </div>
    )
}