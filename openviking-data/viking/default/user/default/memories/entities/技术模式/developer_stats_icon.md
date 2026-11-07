# HomeDeveloperStatsRow 统计图标 URL 绑定规则
开发者首页统计行 HomeDeveloperStatsRow 对 API 返回的 icon 绑定 :src 时按前缀区分是否直通。

## 绑定规则
- 以 http 或 / 开头的地址可原样使用，其余路径应走项目 img() 等静态资源助手，避免把任意字符串绑成 src 引入 javascript: 类风险
- 审查时与 v-html 一并作为门户首页统计组件的安全检查项

## 验证与归属
- 验证：HomeDeveloperStatsRow 的 :src 对 API icon 仅直通 http/，其余走 img()，未引入 javascript: 类绑定
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeDeveloperStatsRow.vue
- 所属项目：门户；来源会话ID：d84d57ba-71c5-494d-8381-3d716e160510；代码基线：50578e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "developer_stats_icon",
  "source_extraction_id": "9bff8e575e8c477cbc2cfba8158e77d8",
  "version": 1,
  "memory_type": "entities"
}
-->