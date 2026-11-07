# 账号冻结原因下拉锁定修复（苏住房G）
苏住房G 项目修复账号冻结原因下拉导致字段锁死问题。

## 问题根因
- 下拉含「多次输入错误密码」项，原逻辑只要当前原因是该值即禁用编辑，导致手动或系统带入后字段变灰。

## 修复方案
- 下拉移除「多次输入错误密码」选项（系统自动冻结原因不可手动选）
- 仅当 originUserAccountState === 冻结 且原因为「多次输入错误密码」时只读锁定
- 选「其他」自动切到手工输入
- 手动冻结选「管理员手动冻结」等不再锁死

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：system/user/detail.vue、components/AccountFreezeFields/AccountFreezeFields.vue、utils/accountFreeze.js
- 所属项目：苏住房G；来源会话：92b6e126-dfc6-494c-a323-5344cc8169de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_freeze_dropdown_fix",
  "source_extraction_id": "fcdaef81ba1e46148b85f174762cf478",
  "version": 1,
  "memory_type": "entities"
}
-->