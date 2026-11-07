# 路由拦截与首页改版约定
无锡H5实现无Token仅允许访问首页newHome，且首页改为「无锡三资监管」并移除TabBar等。

## 路由与拦截
- `App.vue`无Token时仅允许访问`/pages/index/newHome`，未授权访问`reLaunch`回首页
- 有Token时仍可正常访问其他页面（小程序带token嵌入场景）
- `api/index.js`登录过期401改为`reLaunch`到`newHome`（因TabBar已移除）

## 首页改版
- `newHome.vue`内容居中显示「无锡三资监管」，移除轮播、菜单、接口请求等
- `pages.json`将`newHome`设启动页首位，导航栏标题改「无锡三资监管」，移除底部TabBar

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：App.vue、newHome.vue、pages.json、api/index.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：092e322c-b977-4c98-acfd-3459f57a3abb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "route_token_guard_home",
  "source_extraction_id": "0a9fa37d68404f5d868ad49dae3ecd4d",
  "version": 1,
  "memory_type": "entities"
}
-->