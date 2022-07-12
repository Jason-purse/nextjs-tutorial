import {parseISO, format} from "date-fns";

/**
 * 解析ISO 的Date 组件
 * @param dateString
 */
export default function Date({dateString}) {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}