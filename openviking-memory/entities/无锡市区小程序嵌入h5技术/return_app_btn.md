# 嵌入宿主H5的ReturnAppBtn与backToApp回退链
zhi2-mobile-admin-h5-c-unlimited 作为苏服办/微信小程序 web-view 内嵌 H5 时，提供 ReturnAppBtn 固定底栏并通过 backToApp.js 实现三端回退。

## Description
- 组件：ReturnAppBtn.vue 固定底栏，页面 padding-bottom 留白；仅在检测到嵌入环境时展示，避免纯浏览器 H5 出现无效按钮
- 工具：utils/backToApp.js 处理回退逻辑
- 使用页面：业主决策 index 引入该组件与工具

## 回退顺序
- 优先苏服办 lightAppJssdk.navigation.close/goBack
- 其次 wx.miniProgram.navigateBack
- 再回落门户配置的返回路由或首页

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：bcab9206-8b7b-478a-a355-2173f531fd74
- 代码基线：f86ed66
- 涉及文件：ReturnAppBtn.vue、backToApp.js、pages_owner/decision/index.vue

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "return_app_btn",
  "source_extraction_id": "d81982be12fb49649927c1f09cdc1a12",
  "version": 1,
  "memory_type": "entities"
}
-->