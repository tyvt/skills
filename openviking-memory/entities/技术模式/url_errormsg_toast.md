# URL errorMsg 参数全局错误提示
产品2.0 在应用入口读取 URL 中的 errorMsg 参数，用 Element $message.error 展示对应文案。

## 实现说明
- Vue.use(Element) 后在 createInstance 根实例挂载完成用 instance.$message.error
- pickErrorMsgFromUrl(vm) 先读 window.location.search 的 errorMsg，再读 vm.$route.query.errorMsg，数组取第一个
- $nextTick 保证路由首次解析后读取 $route.query

## 访问示例
- https://域名/?errorMsg=登录已过期
- https://域名/#/login?errorMsg=无权限

## 涉及文件
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/router/index.js
- zhi2-web-admin/src/utils/element.js

## 验证与归属
- 来源会话：a70a9913-e202-4f48-9ff9-a75c6d3d3699
- 所属项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "url_errormsg_toast",
  "source_extraction_id": "b09225a3568c454faf9481dce0c632cd",
  "version": 1,
  "memory_type": "entities"
}
-->