# 金额累加精度误差改用 roundUp 统一保留两位
无锡锡山业主决策H5 中多个金额用浮点数直接 reduce 累加产生精度误差（如 8977.810000000001）。

## 问题根因
- 多个金额用浮点数直接 reduce 累加产生精度误差
- 原在每一步用 toFixed(2) 再转回 Number，边界情况下仍不稳定

## 解决方案
- 改用项目已有 roundUp 工具，累加完成后统一保留两位小数
- src/pages/balancePublicity/index.vue 的 currentAmount 用 roundUp(sum, 2)，正确显示 8977.81
- 与明细项 amountTransform 格式化逻辑保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=无锡锡山业主决策H5
- 涉及文件：src/pages/balancePublicity/index.vue、src/utils/index.ts
- 所属项目：无锡锡山业主决策H5；来源会话：ab129a0e-1c44-4dd6-a67d-4cd23a470f2d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_roundup_fix",
  "source_extraction_id": "c1033b18a29d424db2ab4b71f4c4cb5d",
  "version": 1,
  "memory_type": "entities"
}
-->