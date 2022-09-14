import Footer from './footer'
import Navbar from './navbar'
import {PropsWithChildren} from "react";
export default function Layout({children}: PropsWithChildren<any>) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}