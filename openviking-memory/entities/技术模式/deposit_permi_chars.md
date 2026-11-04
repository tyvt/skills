# Deposit通知按钮权限字符预期
太仓G端 deposit 模块按钮显示依赖权限字符，普通用户无权限字符不显示属预期行为。

## 权限机制
- 管理员账号带 `*:*:*` 超级权限，`checkPermission` 与 `v-hasPermi` 直接放行
- 普通用户无对应权限字符时按钮不显示，非 bug

## 已知权限字符
- 撤销按钮需 `deposit:depositnotice:rev`（疑似 revoke 缩写）
- 补录、人工记账、打印等按钮需各自对应权限字符（会话未载全）

## 验证与归属
- 所属项目：太仓G；来源会话：4c6ee833-9c90-4028-9924-d76a48a30e77；代码基线：none
- 涉及文件：hasPermi.js、hasRole.js、store、directives/permission/index.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_permi_chars",
  "source_extraction_id": "dd32723f05a14b2bb4948bdacf39d9ea",
  "version": 1,
  "memory_type": "entities"
}
-->