# 冻结原因下拉自锁导致字段选中即只读
苏住房G系统用户管理页将系统写入的冻结原因暴露为下拉可选项，命中锁定判据造成选中即禁用编辑的自锁。

## 问题根因
- 原锁定条件：当前原因===「多次输入错误密码」就禁用编辑
- 该原因是系统自动冻结写入的值，却被放入人工下拉项，用户选中即命中条件，字段立刻只读
- 已知清单未覆盖「把系统写入值当可选项再作锁定判据」这类自锁根因
- 另需注意：对「其他」等选项在选中回调里做 setState 特判（如 showManualInput=true 并清空值）会造成选项无法选中、控件形态突变（会话 d80e5a47）

## 解决方案
- 从人工下拉删除「多次输入错误密码」，系统原因不应可选
- 锁定判据改为加载时原始状态：originUserAccountState为冻结且原始原因为该项时才只读
- 「其他」仅作为普通下拉选项，选中即写入表单值，不自动切手工输入态；仅用户显式点击右侧「手工输入」按钮才切换到文本框
- 关联缺陷（会话 d80e5a47）：onFreezeReasonSelect 对 val==='其他' 特判并 $emit 清空值，导致「其他」永远存不进、界面跳输入态；修复为去掉特判

## 验证与归属
- 验证：选「管理员手动冻结」仍可编辑，原本自动冻结账号仍只读
- 涉及文件：system/user/detail.vue、AccountFreezeFields.vue、utils/accountFreeze.js
- 所属项目：苏住房G；来源会话：92b6e126-dfc6-494c-a323-5344cc8169de；代码基线：805ea8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "freeze_reason_dropdown_lock",
  "source_extraction_id": "e51aeec6c7bc4201bc8f7a1fbfce615b",
  "version": 2,
  "memory_type": "entities"
}
-->