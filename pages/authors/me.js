import useSWR from 'swr'

/**
 * me 通过 swr 进行客户端渲染 ...
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Me(props) {
    const { data, error } = useSWR('/api/profile', fetch)
    if(error) {
        return <div>failed to load</div>
    }
    if(!data) {
        return <div>loading</div>
    }
    return (
        <div>hello {data.name}!</div>
    )
}