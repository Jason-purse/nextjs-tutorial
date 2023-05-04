import {useEffect, useRef, useState} from "react";
import cssModule from './bidscroll.module.scss'
import {useRouter} from "next/router";

const left = [
    1, 2, 3, 4, 5
]

export default function BidScroll() {

    let [activeIndex, setActiveIndex] = useState(0)
    let router = useRouter()
    let ref = useRef(undefined)

    // 浅路由 模拟新路由(新组件挂载), 这个组件之前的状态都会保留 ..
    useEffect(() => {
        router.push(`#${activeIndex + 1}`, null, {shallow: true, scroll: false})

        // ref.current?.children.item(activeIndex).scrollIntoView()

    }, [activeIndex])

    console.log(router)
    // bidscroll

    return (
        <div className={cssModule.bidScroll}>
            <ul className={cssModule.navList}>
                {left.map((ele, index) => <li key={index} onClick={() => {
                    setActiveIndex(index);
                }}
                                              className={`${cssModule.navElement} ${activeIndex === index ? cssModule.navActiveElement : ''}`}>{ele}</li>)}
            </ul>
            <div className={cssModule.rightContent}
                 ref={ref}
                 onWheel={scrollListen().bind(null,ref,setActiveIndex)}>
                {left.map((ele, index) => <section id={`${index + 1}`}
                                                   key={index}
                                                   className={`${cssModule.navElementContent}  ${activeIndex === index ? cssModule.navActiveElementContent : ''}`}>{ele}</section>)}
                <section style={{height: `calc(100% - 400px)`}}/>
            </div>
        </div>
    )
}


// 节流的思想(无关紧要的计算) ... 限制次数 login
function scrollListen() {
    let timer = null;
    return (ref, callback,event) => {
        if(timer != null) {
            clearTimeout(timer)
            timer =  null
        }
        timer = setTimeout(() => {
            if (ref.current) {
                let scrollTop = ref.current.scrollTop
                // 取天花板数 ...
                let index = Math.ceil(scrollTop / 400)
                // scrollTop <=  component.0+ component.1 + component.2 + component.n

                console.log("onscroll")
                callback(index)
            }
        },200)
    }
    // 滚动 ...
    // let count = event.target.childElementCount


    // let selectNodes = []
    // for (let i = 0; i < nodes.length; i++) {
    //     if (nodes.item(i).scrollTop === 0) {
    //         console.log(nodes.item(i).scrollTop)
    //         callback(i + 1)
    //         return;
    //     } else if (nodes.item(i).scrollTop < 0) {
    //         selectNodes.push(i + 1)
    //     } else {
    //         // 直接 打断
    //         break;
    //     }
    // }
    //
    // // 直接弹出即可
    // callback(selectNodes[-1])
}