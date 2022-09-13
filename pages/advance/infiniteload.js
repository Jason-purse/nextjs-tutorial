import React, {useRef, useState} from "react";
import useSWRInfinite from "swr/infinite";
import {get} from "../../util/RequestUtil";

/**
 * fetch 函数 ...
 * @param url
 * @returns {Promise<T>}
 */
const fetcher = get;
const PAGE_SIZE = 6;

export default function InfiniteLoad() {
    const [repo, setRepo] = useState("reactjs/react-a11y");
    // const [val, setVal] = useState(repo);

    const {data, error, mutate, size, setSize, isValidating} = useSWRInfinite(
        (index) =>
            `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
                index + 1
            }`,
        fetcher
    );

    const ref = useRef(null)

    // 是否存在issues ...
    const issues = data ? [].concat(...data) : [];

    // 是否加载初始化数据 ...
    const isLoadingInitialData = !data && !error;

    // 是否可以  处于加载中 ...
    const isLoadingMore =
        // 初始化数据
        isLoadingInitialData ||
        // 并且 即将请求的页面没有数据,才进行加载(如果没有数据,则不管)
        (size > 0 && data && typeof data[size - 1] === "undefined");
    // 是否为空 ... 如果为空,(如果第一页不为空,必然,有数据) ...
    const isEmpty = !data || data?.[0]?.length === 0;
    // 是否触底了 ...
    const isReachingEnd =
        // 第一页为空, 或者 有数据,但是最后一页的数据小于页面尺寸 ...
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    //  如果有请求 并且 且是当前页面 ...
    const isRefreshing = isValidating && data && data.length === size;

    return (
        <div style={{fontFamily: "sans-serif"}}>
            <input
                // value={val}
                // onChange={(e) => setVal(e.target.value)}
                placeholder="reactjs/react-a11y"
                ref={ref}
            />
            <button
                onClick={() => {
                    if (ref.current) {
                        setRepo(ref.current.value);
                        setSize(1);
                    } else {
                        console.log("no input")
                    }
                }}
            >
                load issues
            </button>
            <p>
                showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
                issue(s){" "}
                <button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                >
                    {isLoadingMore
                        ? "loading..."
                        : isReachingEnd
                            ? "no more issues"
                            : "load more"}
                </button>


                <button disabled={isRefreshing} onClick={() => mutate()}>
                    {isRefreshing ? "refreshing..." : "refresh"}
                </button>

                {/*清理  表示没有尺寸,设置请求页为 0*/}
                <button disabled={!size} onClick={() => setSize(0)}>
                    clear
                </button>
            </p>
            {/*要么就没有数据,要么就是有数据 ...*/}
            {issues.map((issue) => {
                return (
                    <p key={issue.id} style={{margin: "6px 0"}}>
                        - {issue.title}
                    </p>
                );
            })}
        </div>
    );
}
