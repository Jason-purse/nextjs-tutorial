import Link from "next/link";

export default function Me(props) {
    return (
        <div>
            Read <a href="/posts/first-post">this page!</a>
            <p> To </p>
            Read <Link href="/posts/first-post"><a>this page!</a></Link>
        </div>
    )
}