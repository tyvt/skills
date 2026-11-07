# 公共查询复杂表参数序列化修复
苏住房G(zhi2-web-admin) 公共查询 complex 页面因 axios 0.28 与自定义 paramsSerializer 不兼容导致页面 created 阶段调用 getList 报 AxiosError，已修复。

## 问题根因
- axios 0.28 与自定义 paramsSerializer 不兼容，页面 created 阶段调用 getList 触发 AxiosError: options must be an object
- 原逻辑使用自定义 getList、导出用 $post 及 paramsSerializer，会产生 propertyTypes[] 这类数组默认序列化问题

## 修复内容
- 移除 paramsSerializer、自定义 getList 和导出用的 $post 逻辑
- 在 getQueryParams 中将 propertyTypes 数组转为逗号分隔字符串再传给接口（如 propertyTypes=low,multi）
- 导出参数 complexIds 同样改为逗号分隔字符串，避免 axios 对数组的默认序列化问题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue
- 来源会话ID：466205e5-ee7c-4c88-9a01-a864233745f0
- 备注：若后端要求重复传参（propertyTypes=a&propertyTypes=b）而非逗号分隔，需按后端要求调整

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "axios_params_fix",
  "source_extraction_id": "f6f0729ae96445aa9abdeb6bd96896bb",
  "version": 1,
  "memory_type": "entities"
}
-->