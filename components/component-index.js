import componentCss from './component-index.module.scss'
import {useEffect} from "react";

/**
 * 展示一个 提示信息(动态组件) ...
 * @param text
 * @param loading true / false
 * @returns {JSX.Element}
 */
export default function ComponentIndex({text, loading = false}) {
    return (
        <div className={componentCss.container}>
            {
                showContentOrLoading(loading,text)
            }
        </div>
    )
}

function showContentOrLoading(loading, content) {
    if (loading) {
        return (
            <div>
                loading ...
            </div>
        )
    }
    return (
        <div>
            {content}
        </div>
    )
}