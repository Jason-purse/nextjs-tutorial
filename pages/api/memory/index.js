let data = 0;

export default function handler(request, response) {
    // 如果data 存在 ..
    if (request.query['data'] && request.method === 'POST') {
        console.log("request post value")
        setData(request.query['data'])
        return response.status(200).json({message: "success"})
    }

    console.log("request value ... ")
    return response.status(200).json(data)
}

export function getData() {
    return data;
}

export function setData(value) {
    data = value;
}