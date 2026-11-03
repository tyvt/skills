# 冻结原因下拉自锁导致字段选中即只读
苏住房G系统用户管理页将系统写入的冻结原因暴露为下拉可选项，命中锁定判据造成选中即禁用编辑的自锁。

## 问题根因
- 原锁定条件：当前原因===「多次输入错误密码」就禁用编辑
- 该原因是系统自动冻结写入的值，却被放入人工下拉项，用户选中即命中条件，字段立刻只读
- 已知清单未覆盖「把系统写入值当可选项再作锁定判据」这类自锁根因

## 解决方案
- 从人工下拉删除「多次输入错误密码」，系统原因不应可选
- 锁定判据改为加载时原始状态：originUserAccountState为冻结且原始原因为该项时才只读
- 选「其他」自动切手工输入态；控件保留手动输入/下拉切换按钮（后缀切换组件）

## 验证与归属
- 验证：选「管理员手动冻结」仍可编辑，原本自动冻结账号仍只读
- 涉及文件：system/user/detail.vue、AccountFreezeFields.vue、utils/accountFreeze.js
- 所属项目：苏住房G；来源会话：92b6e126-dfc6-494c-a323-5344cc8169de；代码基线：805ea8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "freeze_reason_dropdown_lock",
  "source_extraction_id": "6ae49cdcb1234cc49f4b259d6ba75b4b",
  "version": 1,
  "memory_type": "entities"
}
-->