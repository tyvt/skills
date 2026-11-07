# ref8443计数器减号归零禁用修复
苏住房C H5 ref8443 防汛检查页 Ref8443Inspection.vue 中，数量步进器减号按钮在值为 0 时未禁用，已修复。

## 问题背景
- 用户要求：数量为 0 时减号按钮应禁用
- 标准模板 inspection/index.vue 的步进器已有 `:class="{ disabled: ... <= 0 }"`，仅 ref8443 组件缺失该逻辑
- ref8443 计数器使用 `step(i, d)` 配合 `Math.max(0, ...)`，值不会小于 0，但减号按钮在 0 时未视觉禁用

## 修复内容
- Ref8443Inspection.vue：所有数量步进器减号按钮加 `:class="{ disabled: counters[i] <= 0 }"` 与 `:disabled="counters[i] <= 0"`，值为 0 时禁用（共 7 处，覆盖汛中/汛后全部计数器）
- ref8443.css：新增 `.counter-btn.disabled / :disabled { opacity:.35; cursor:not-allowed }` 置灰样式

## 验证与归属
- 验证：值 0 时减号 class=`counter-btn disabled`、opacity 0.35、disabled 生效；点击禁用减号值保持 0 不变；加号保持可用；截图确认树木倾倒数量减号置灰
- 提交 1052ca6，合并 dev 为 f6b7550；独立 worktree 完成/合并/删除，主工作区干净；dist 已部署 nginx 8095
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：2026-11-06 消息 0-62

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "苏住房C技术修复",
  "name": "ref8443_minus_disabled",
  "source_extraction_id": "cf6e19104f9c4587a8b669d381f3a43b",
  "version": 1,
  "memory_type": "entities"
}
-->