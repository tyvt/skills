# SingleSelect下拉跳动修复（价格备案户室维护抖动）
价格备案申请维护户室时，编辑弹窗中户型下拉列表打开瞬间跳动，根因在公共组件 SingleSelect.vue 的 syncPopperStyle 反复重定位。

## 问题根因
- zs-select 的 SingleSelect.vue 中 syncPopperStyle 在下拉展开后用 [0,32,80,160,320]ms 五个定时器反复以 position:fixed 重写 left/top 并调用 updatePopper
- 展开初期下拉未完成布局（高度 0/未定）先被错误定位，后续定时器测得高度变化又纠正，导致下拉在上下翻位间来回跳

## 解决方案
- 下拉高度 <=0（未完成布局）时跳过定位，避免先落错位
- 记录 lastPopperPlacement，本次定位与上次落地定位在 1px 内一致则不重写 inline style，一旦稳定即保持不动
- 每次展开/收起重置记忆，保留原有宽度/zIndex/上翻定位意图

## 验证与归属
- 验证：npx eslint SingleSelect.vue exit 0；npm run build exit 0（仅存量 Sass 弃用告警）
- 涉及文件：zhi2-web-admin/src/components/zs-select/SingleSelect.vue
- 所属项目：zhi2-web-admin（苏州市房地产监测V3）；来源会话：2026-11-04；提交号：b9de02e9c
- 禅道 bug 6173 已 resolved/fixed，resolvedBy=tiany，assignedTo=lichandan

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "single_select_jitter",
  "source_extraction_id": "7975823eef694e84a287026c4a64ee12",
  "version": 1,
  "memory_type": "entities"
}
-->