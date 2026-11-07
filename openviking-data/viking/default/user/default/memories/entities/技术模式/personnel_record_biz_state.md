# 从业人员业务状态字典改用 biz_state
苏州市房地产监测V3 中开发企业-从业人员管理页业务状态字典由未配置的 `personnel_business_status` 改为 `biz_state`，修复列表显示原始值 0/1/2 的问题。

## 问题根因
- 从业人员管理页（`toB/personnelRecord`）业务状态字典原走 `personnel_business_status`，后台未配置该字典导致 tag 选项为空、列表显示原始值 0/1/2

## 修改内容
- `src/views/toB/personnelRecord/components/index.vue`：`initDict` 中列表 tag 字典改为 `getDicts('biz_state')`，经 `listTableRowAugment` 传入行增强正常渲染状态标签
- `src/views/toB/personnelRecord/components/detail.vue`：头部「业务状态」tag 的 `personnelStatusOptions` 改为取 `biz_state` 字典
- 按钮显隐逻辑（编辑/注销/删除按 `bizState` 与 `cancelStatus` 判断）未改动

## 验证与归属
- 需确认 `biz_state` 字典含 0 待提交、1 审核中、2 已备案、9 已注销 等标签项
- 所属项目：苏州市房地产监测V3；来源会话ID：003dced8-e465-45b4-8431-b2d33508dfd5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_record_biz_state",
  "source_extraction_id": "37bad7824c0e47148de04351dc784be5",
  "version": 1,
  "memory_type": "entities"
}
-->