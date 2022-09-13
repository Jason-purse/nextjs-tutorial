const data = []

for (let i = 0; i < 100; i++) {
    data.push(i)
}

/**
 * page 数据
 * @param request
 * @param response
 */
export default function handler(request, response) {
    let {page, pageSize = 10} = request.query
    if (page && page >= 1) {
        let start = (page - 1) * pageSize;
        response.status(200).json({
            data: data.slice(start, start + (pageSize * 1)),
            total: data.length,
            totalPage: Math.ceil(data.length / (pageSize * 1))
        })
    } else {
        response.status(400).json({message: "no page param !!!"})
    }
}