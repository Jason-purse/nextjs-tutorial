# 学习next.js 一些概念,有助于编写服务端 / 客户端分离的前端代码
## `App` 组件
    - 该组件位于 `pages/_app.tsx`
    - 可以做一些不可思议的事情
        - 页面切换之间保持布局的持久化
        - 切换页面时保持状态（state）
        - 使用 componentDidCatch 自定义错误处理
        - 向页面（pages）注入额外的数据
        - 添加全局 CSS
    - 缺陷(我认为是缺陷)
        - 加入 getInitialProps  导致整个应用的每一个Page 无法进行静态生成优化 ...
        - 此组件无法使用额外的数据抓取方法 ...
        - getInitialProps 返回额外的数据并合并到PageProps中 ...
    