# bizStateTone漏已备案致状态圆点误灰修复
在 `InfoCardDialog.vue` 的 `bizStateTone` 中，字典值「已备案」原落入灰分支致状态圆点误灰，改为先判异常（红）再判备案/有效（绿），未知灰，圆点用 `currentColor` 同步变色。

## 问题根因
- `bizStateTone` 原仅将「有效/正常」判绿
- 字典值「已备案」落入灰分支，导致状态圆点误灰

## 修复方案
- 先正则判异常（红）再判备案/有效等（绿）
- 未知状态保持灰
- 圆点使用 `currentColor` 同步变色

## 涉及文件
- InfoCardDialog.vue、WorkCardDialog.vue
- utils/personnelStatus.js、AgencyPersonnelList.vue
- e2e/institution/agency-personnel-real-api-flow.spec.js
- _card_preview/preview.html、scripts/_shot_cards.mjs、.tmp-card-check/entry.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/066.md
- 所属项目：苏州市房地产监测V3；来源会话：b3409b66-bfb0-4aec-941e-ffd48580fe9c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_state_tone_fix",
  "source_extraction_id": "ea7b06cf68f14ed5a1ce3310fa59cb66",
  "version": 1,
  "memory_type": "entities"
}
-->