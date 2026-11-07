# 业主决策页返回应用按钮组件
无锡市区小程序嵌入H5中，业主决策列表页已加入与截图一致的「返回应用」按钮，封装为可复用组件。

## 组件构成
- src/components/ReturnAppBtn/ReturnAppBtn.vue（新建）：圆角描边按钮，文案「返回应用」，固定在页面底部，仅在H5嵌入环境显示（苏服办/微信/已配置门户返回路由）
- src/utils/backToApp.js（新建）：点击后依次尝试苏服办lightAppJssdk.navigation.close/goBack、微信wx.miniProgram.navigateBack、门户配置返回路由或首页
- src/pages_owner/decision/index.vue：引入ReturnAppBtn，预留padding-bottom避免列表被遮挡

## 复用方式
- 其他页面需返回按钮时直接引入ReturnAppBtn组件即可

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/components/ReturnAppBtn/ReturnAppBtn.vue、src/utils/backToApp.js、src/pages_owner/decision/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：bcab9206-8b7b-478a-a355-2173f531fd74；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "return_app_btn_component",
  "source_extraction_id": "913058b2466f4d2ea7d6880e88c6a947",
  "version": 1,
  "memory_type": "entities"
}
-->