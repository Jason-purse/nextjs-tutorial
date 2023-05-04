import {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <>
            <Html>
                <Head>
                    <Script src="https://maps.googleapis.com/maps/api/js"
                            onLoad={() => console.log("script loaded !!!!")}/>\
                    {/*<title>nextJs-tutorial</title>*/}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        </>
    )
}