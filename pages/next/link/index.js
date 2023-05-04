import Link from "next/link";


export default function LinkComponent() {

    return (
        <div>
            <Link href="/next/router/routerStudy" replace>
                <a>bidscroll</a>
            </Link>


            <div id="1" style={{height: '100vh'}}>
                <p>这个部分的高度刚好是100vh,我们点击下面的按钮,通过浅路由的方式,进入相同路由,但是取消滚动到顶部的行为,而是滚动到 顶级锚点</p>
                <Link href='./link/scrollTop' shallow={true} scroll={false}>
                    <a>浅路由</a>
                </Link>
            </div>
        </div>
    )

}