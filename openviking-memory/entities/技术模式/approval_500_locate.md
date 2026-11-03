# 审批接口 500 分支二分定位法
同一审批接口出现「驳回200/同意500」分支差异时，先二分分支再查字段长度，比复刻环境快10倍。

## 问题现象
- 同一审批接口驳回返回200、同意返回500，常规复刻环境比对耗时长
- 同意分支比驳回多写 OPERATOR_ROLE 等角色字段，命中 VARCHAR(64) 长度不足

## 定位方法
- 先二分分支：列出通与不通两条路径各自新增步骤/字段/表，缩小搜索空间一个量级
- 只在不通分支查新增写入字段类型/长度/可空/外键，命中后做最小修复并回归两分支

## 沉淀与复用
- 定位法沉淀进台账 common-errors.md 条目12–15，下次同类现象直接照走
- 遇同款脚本多环境情况，修完还需同步 DDL 到其他环境

## 验证与归属
- 来源会话 session-14dff73a（基线6156653）复盘确认「先二分分支再查列长」比复刻快10倍
- 修复后回归6/6，台账条目12–15已入 common-errors.md
- 涉及文件：zhi2-web-admin/docs/flood/common-errors.md、e2e-verify-flood.cjs

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_500_locate",
  "source_extraction_id": "676b5978950e4a3fbe7a36b00cf074be",
  "version": 1,
  "memory_type": "entities"
}
-->