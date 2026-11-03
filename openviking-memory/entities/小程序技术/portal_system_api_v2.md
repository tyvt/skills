# 门户首页轮播与/system接口对齐我的页的v2.0前缀与Token
webview/门户首页接轮播等 /system/* 能力时须拼文件服务域名、加 /v2.0 前缀并用门户 Token。

## 接口规范
- 接口形如 GET /system/banner/page（bannerType 对字典 banner_type），取 rows[].pictureUrl 前须 拼文件服务域名，相对路径会以本地资源加载并 500
- 网关路径在小程序侧要在 /system 前加 /v2.0，与 pages/user/index/index.vue 一致
- Token 也按该页门户快照/刷新逻辑取用，禁止沿用无关全局 token
- 新接 /system 接口前先对照 user/index 的 base 与 header 写法

## 验证与归属
- 验证证据：会话 eb625bb1 token 参考 user/index；/system 前加 v2.0；pictureUrl 相对路径需拼域名；getBannerList 调 /system/banner/page
- 涉及文件：pages/webview/home.vue、api/home.js、pages/user/index/index.vue
- 所属项目：小程序；来源会话ID：eb625bb1-51ca-49ee-a579-ba01827034bb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_system_api_v2",
  "source_extraction_id": "3009dd90074b496cb5ed0d2113ea792c",
  "version": 1,
  "memory_type": "entities"
}
-->