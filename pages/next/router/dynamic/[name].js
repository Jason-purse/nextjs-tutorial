import {useRouter} from "next/router";

export default function DynamicRoute() {
    let router = useRouter();
    let {name} = router.query
    return (
        <div>
            {`hello , this is dynamic page ,you click route name is ${name}!!!`}
        </div>
    )
}