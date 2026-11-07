# 详情页StatCardsRow间距
园区公共收益详情页中 StatCardsRow 夹在 DetailTemplate 与列表间时，需清零模板上边距并单独设 12px 区块间距。

## 问题根因
- `DetailTemplate` 默认 `margin-bottom: 24px`；统计行 `StatCardsRow` 自身无下边距，若列表区块再带 `margin-top` 会叠加或缺失，视觉不一致。

## 解决方案
- 在该详情页将基本信息区 `DetailTemplate` 的 `margin-bottom` 设为 `0`。
- `StatCardsRow` 外包一层设 `margin-top: 12px`、`margin-bottom: 12px`；取消与相邻区块重复的 12px 外边距，避免双倍间距。属页面级组合间距，不必改公共 DetailTemplate 默认值。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证会话：040b39a1（pubHouse/detail 统计区间距未修好，改为 0/12/12 组合）
- 涉及文件：zhi2-web-admin/src/views/benefit/pubHouse/detail.vue、zhi2-web-admin/src/components/StatCardsRow/index.vue、zhi2-web-admin/src/components/Headline/index.vue
- 所属项目：园区公共收益；代码基线：36a9a7e；来源会话：040b39a1-51bf-45f6-949b-bde0a5463b5a

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "详情页StatCardsRow间距",
  "source_extraction_id": "1e816f9fc3aa4168b1160713b0d4dc9c",
  "version": 1,
  "memory_type": "entities"
}
-->