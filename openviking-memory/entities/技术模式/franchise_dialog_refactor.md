# 加盟门店弹窗改用公共 SelectDialog 组件
苏州市房地产监测V3 将 `FranchiseDialog.vue` 内嵌选择弹窗改为公共 `SelectDialog.open()`。

## 修改内容
- 加盟门店名称输入框：使用 `suffix-icon="el-icon-search"`，去掉手写 `slot="suffix"` 和 `@click.native`；保留 `readonly` + `@focus="selectCompany"`，与监管、信用等页一致
- 选择门店：删除模板内嵌的 `<zs-select-dialog>` 以及 `companyDialogVisible`、`companySearchItems`；在 `selectCompany()` 中改用 `SelectDialog.open()`（接口、列、关键字搜索与原先相同）；`setCompany` / `close` 不再维护选择弹窗的 visible 状态
- 其它：仅保留 `DetailTemplate` 的局部 import，`zs-*` 仍走全局注册；Lint 与 Vue review 无阻断问题

## 验证方式
- 关联 → 聚焦门店名称 → 选择并确认回填；编辑时名称不可选；查看

## 涉及文件
- `zhi2-web-admin/src/views/company/brand/components/FranchiseDialog.vue`

## 归属
- 所属项目：苏州市房地产监测V3
- 来源会话：81b187e2-7713-4d40-9f74-4a9e3293f049

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "franchise_dialog_refactor",
  "source_extraction_id": "006d2482687443a7a80ce2847fa57669",
  "version": 1,
  "memory_type": "entities"
}
-->