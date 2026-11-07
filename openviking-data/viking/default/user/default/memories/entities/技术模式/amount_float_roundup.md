# 金额浮点累加须用roundUp防精度误差
无锡锡山业主决策H5 中多个金额浮点数直接 reduce 累加产生精度误差（如 8977.810000000001）。

## 问题根因
- balancePublicity/index.vue 中多金额浮点数直接 reduce 累加，产生浮点精度误差
- 累加结果与明细项 amountTransform 格式化逻辑不一致

## 解决方案
- 改用 roundUp 工具，于累加完成后统一保留两位小数
- 与明细项 amountTransform 格式化逻辑保持一致

## 验证与归属
- 验证：extracted source=cursor session=ab129a0e-1c44-4dd6-a67d-4cd23a470f2d
- 涉及文件：src/pages/balancePublicity/index.vue、src/utils/index.ts
- 所属项目：无锡锡山业主决策H5；来源会话：ab129a0e-1c44-4dd6-a67d-4cd23a470f2d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_float_roundup",
  "source_extraction_id": "878c83b7f0a2436e8ec91da8162a19b5",
  "version": 1,
  "memory_type": "entities"
}
-->