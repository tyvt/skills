# 企业端从业人员详情页发起变更按钮
企业端 `toB/personnelRecord/components/detail.vue` 详情页新增「发起变更」按钮，补齐 G 端已有能力。

## 问题背景
- 企业端详情页遗漏「发起变更」按钮，仅 G 端 `company/staffManagement` 实现了该按钮

## 修复方案
- 新增按钮显示条件：查看态且备案通过（bizState=2）且未注销
- 权限串：`company:personnelRecordChange:change`
- 点击调用 `getLastPersonnelRecordChange` 并跳转 `toB/personnelChange/detail`
- 新增 `changeLoading` 与 `resolveChangeId` 状态变量

## 验证与归属
- 验证证据：extracted source=zcode session=session_5860efb84bbcb109aba35f9f7a52caad
- 涉及文件：`toB/personnelRecord/components/detail.vue`
- 来源会话ID：session_5860efb84bbcb109aba35f9f7a52caad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_detail_change_btn",
  "source_extraction_id": "b95348e2547a4fca98ef615e2cc3835f",
  "version": 1,
  "memory_type": "entities"
}
-->