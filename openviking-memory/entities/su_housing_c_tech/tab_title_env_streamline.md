# 苏住房C Tab标题与环境变量精简
苏住房C 将5个tab页标题改为“苏住房”，隐藏所有页面navbar，并按网关文档精简环境变量。

## 配置变更
- 移除未使用的环境变量：VITE_APP_SFB_APP_KEY、VITE_APP_SFB_APP_SECRET
- 固定值改为代码默认：VITE_APP_SFB_VERSION(1.0.0)、VITE_APP_SFB_CHARSET(UTF-8)、VITE_APP_SFB_ORIGIN(1)
- 保留需在开放平台申请的环境变量：VITE_APP_USE_SFB_DISPATCHER、VITE_APP_SFB_APP_ID、VITE_APP_SFB_GET_INTERFACE_ID、VITE_APP_SFB_POST_INTERFACE_ID

## 代码改动
- dispatcher.js 中 version、charset、origin 写死为默认值，验签仍用 app_id、interface_id
- 涉及文件：dispatcher.js、pages/index/home.vue、project.vue、property.vue、community.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：0f1c6af9-9dca-4fad-8282-c48ebf2f048d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tab_title_env_streamline",
  "source_extraction_id": "2d3f203c03d84e25a3c003479966ebf2",
  "version": 1,
  "memory_type": "entities"
}
-->