import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
const handler: NextApiHandler =  function (req: NextApiRequest,res: NextApiResponse) {
    res.status(200).json("这是一个API 路由使用示例 ....")
}
export default  handler