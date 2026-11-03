# 要件配置驱动真相源
页面「要件上传」格子的定义不在前端代码，而在附件配置中心按 busCode 配置，前端仅读取渲染。

## 链路
- 配置维护：tool/fjflpz/index.vue 选 busCode，`/file/appendixConfig/page` 查配置
- 单条定义：FjDialog.vue 含业务编码、是否必填、文件类型、大小限制等
- 页面读取：详情页 AppendixPackageSection 传 `:bus-code` 取自路由 `meta.busCode`
- 拉取接口：`/file/appendix/listAppendixPackage` 入参 `{busCode, busId}`
- 必填校验：`checkRequiredAppendix` 按 `isRequired==='1'` 校验

## 结论
- 增减/改名/调整必填均在附件配置中心按 busCode 维护，无需改代码
- 确认页面 busCode 查其菜单路由 meta.busCode（后端菜单管理配）

## 涉及与验证
- 会话 session-142446f5-2a07-4b22-8cc7-74b787304073（基线 235e6ee）用户问证书管理要件
- 文件：fjflpz/index.vue、FjDialog.vue、AppendixPackageSection、utils/appendix.js、conLandLic/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_config_source",
  "source_extraction_id": "12244aba6c2143ed925def5f8c54b8d0",
  "version": 1,
  "memory_type": "entities"
}
-->