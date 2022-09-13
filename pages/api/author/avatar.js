/**
 * 作者地址 ....
 * @param request
 * @param response
 */
export default function handler(request,response) {
    response.status(200).json({avatar: "https://upload.jianshu.io/users/upload_avatars/19833353/95a44152-4a15-48a9-80af-42b4ff09b52d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"})
}