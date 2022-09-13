import {useEffect} from "react";
import useSWR from "swr";
import {get} from "../util/RequestUtil";
import avatarCss from './avatar.module.scss'
import {useRouter} from "next/router";
import author from "../api/author";


export default function Avatar() {

    let {data,error} = author.fetchAuthorAvatar()
    let router = useRouter()
    useEffect(() => {
        if (error) {
            router.push('/error')
        }
    })
    if (!data) {
        return <></>
    }
    return (
        <div className={avatarCss.avatarContainer}>
            <img src={data.avatar} alt="author-avatar"/>
        </div>
    )
}