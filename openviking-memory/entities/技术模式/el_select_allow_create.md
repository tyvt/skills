# el-select 开启 allow-create 把历史脏值预置为下拉第一项
[苏房G] 账号冻结原因等「预设枚举 + 历史手填」的 el-select 开 allow-create 后，历史自定义值被 Element 自动追加到下拉首项。

## 现象
- 账号冻结原因预设三项 + 允许管理员手填，历史单据存过自定义文案（如「额度与无业务」）。
- 再次打开时下拉多出第一项「用户手动输入的原因」，回车即选中该脏值。

## 根因
- el-select 配 allow-create: true 后，Element UI 把 v-model 中不在 options 内的项自动追加到下拉选项（通常首项）。
- filterable/default-first-option 放大观感，回车即选中第一项；属 Element 既有行为非数据配置错。

## 修复方案
- 此类「预设枚举 + 历史脏值」下拉去掉 allow-create、default-first-option、filterable。
- 只渲染后端字典/本地预设；历史自定义文案仍在输入框只读回显，不再进候选列表。
- 经验外推：凡是想「受限选择」的下拉都不要顺手加 allow-create。

## 验证与归属
- 验证：会话 cbb5f1e2 用户澄清下拉多出手动输入原因，结论为 allow-create 自动加首项。
- 涉及文件：zhi2-web-admin/src/components/AccountFreezeFields/AccountFreezeFields.vue、zhi2-web-admin/src/utils/accountFreeze.js、zhi2-web-admin/src/components/zs-select/SingleSelect.vue、zhi2-web-admin/src/views/system/user/detail.vue、zhi2-web-admin/src/views/company/userManagement/operator/operatorAddDialog.vue。
- 所属项目：苏住房G；来源会话：cbb5f1e2-ec0c-4fd3-8323-b22f7cdd9fa6；代码基线：805ea8c。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_select_allow_create",
  "source_extraction_id": "8192fcebecfa468d86c9a9c151b01762",
  "version": 2,
  "memory_type": "entities"
}
-->