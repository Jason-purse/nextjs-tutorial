import {useRouter} from "next/router";

export default function SecondMultiRoute() {
    let {start, end} = useRouter().query
    return (
        <div>
            <p>
                current dynamic route is {start || ''}/{end}
            </p>
        </div>
    )
}