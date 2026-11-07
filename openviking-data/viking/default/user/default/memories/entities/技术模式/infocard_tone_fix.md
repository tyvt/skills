# InfoCardDialog业务状态色调修复
苏州市房地产监测V3 项目 zhi2-web-admin 中 InfoCardDialog.vue 的 bizStateTone 原只把「有效/正常」判为绿色，字典里「已备案」落到灰色分支，已修复。

## 修复方案
- 改为先判异常再判正常：/注销|失效|冻结|异常|未备案|未通过|驳回|作废|过期/ → invalid（红）
- /备案|有效|正常|通过/ → valid（绿）；其余 unknown（灰）
- 圆点用 currentColor 与文字同步变绿

## 验证结果
- 实测：已备案/有效/正常 → 绿；未备案/注销/冻结 → 红；审核中 → 灰
- eslint 通过

## 验证与归属
- 涉及文件：src/views/institution/agencyPersonnel/components/InfoCardDialog.vue、WorkCardDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：b3409b66-bfb0-4aec-941e-ffd48580fe9c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "infocard_tone_fix",
  "source_extraction_id": "97e9acda86194a2a9a55d80bc7b40fe0",
  "version": 1,
  "memory_type": "entities"
}
-->