# 标签区 padding 调整致文字换行
苏州市房地产监测V3 的 detail-template.vue 标签区 padding 改为 16px 后文字换行，根因宽度计算未含 padding 增量。

## 问题根因
- detail-template.vue 标签区 padding 改为 16px 后文字出现换行
- 宽度按 LABEL_HORI 计算，未包含 padding 增量导致可用文字宽度不足

## 修复方向
- 需调整盒模型或宽度计算逻辑，将 padding 增量纳入宽度测算
- 避免标签文字因 padding 变更意外换行

## 涉及文件
- src/components/detail-template/detail-template.vue

## 验证与归属
- 验证证据：extracted source=cursor session=9eb9749f-5afe-4f68-a8c6-813dd931775b
- 所属项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "label_padding_wrap",
  "source_extraction_id": "e48180d462ec477a8cff68759c2854c7",
  "version": 1,
  "memory_type": "entities"
}
-->