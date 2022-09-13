/**
 * 这个页面增加两个组件 ... 然后使用swr 进行请求(对其他的进行缓存) ...
 */
import Avatar from '../../components/avatar'
import ComponentIndex from "../../components/component-index";
import author from "../../api/author";

export default function AuthorLayout(props) {
    let {data, error} = author.fetchAuthorAvatar()
    return (
        <div>
            <Avatar/>
            <div>
                <ComponentIndex text={data?.avatar} loading={!data}/>
            </div>
        </div>
    )
}