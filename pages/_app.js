import '../styles/globals.css'
import {SWRConfig} from "swr";

function MyApp({Component, pageProps}) {
    return (
        <SWRConfig value={{
            onError: (error, key) => {
                console.log("出错了 !!!!! error is " + error)
            },
            // 不重试
            errorRetryCount: 0,
            errorRetryInterval: 0,
            // revalidateOnFocus: false,
            revalidateIfStale: false,
            // refreshInterval: 1000,
        }}>
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default MyApp
