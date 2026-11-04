# G-end人员维护模式仅职能字段可编辑
在项目 苏州市房地产监测V3 中，当 `isGTerminalPersonnelMaintainEdit` 为 true 时，仅 `人员角色` 字段（人员职能）可编辑；其他字段通过 `maintainOtherFieldsDisabled` 锁定。

## 行为
- `isGTerminalPersonnelMaintainEdit` 为 true -> 仅 `人员角色` 不带 `:disabled` 可编辑
- 其他字段通过 `maintainOtherFieldsDisabled` 锁定
- `handleSave` 忽略要件校验

## G-end 分支条件
- 列表和详情将 G-end 分支与 `isGTerminal`, `bizState==='2'`, `!isPersonnelCancelled` 对齐

## 涉及文件
- AgencyPersonnelDetail.vue
- AgencyPersonnelList.vue
- LeasePersonnelDetail.vue
- detailMixins.js
- main.js
- e2e spec
- personnelRecord/components/detail.vue

## 验证
- 会话: c622c348-e873-4a4f-9936-9bbb4eab54d2
- 所属项目: 苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "g_terminal_personnel_edit",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "entities"
}
-->