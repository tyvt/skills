# 嵌套弹窗中 zs-select 下拉异常修复
产品2.0（zhi2-web-admin）多个 zs-dialog 打开时 zs-select 下拉出现位置错乱且不展示，最终以最小化改动修复。

## 问题根因
- 真正异常是 `top: -732px` 与 `min-width: 1.87px`：Element Popper 用参考节点（`.el-select` 内 input）的 `getBoundingClientRect()` 算位置，参考宽度≈2px 时坐标错乱、下拉被甩到视口上方
- `z-index: 30000 !important` 已生效、非层级问题
- 根因：「质保期」一行是 `flex gap-4` 里并排 `zs-input` + `zs-select`，表单又有 `.el-form .el-select { width: 100% }`，两者互相挤压使 `el-select` 被压成极窄，参考宽度≈0

## 最终修复（最小化改动）
- `zhi2-web-admin/src/components/zs-select/SingleSelect.vue`：仅给单选下拉补嵌套弹窗场景下的面板重定位、宽度同步和层级修正，未动 MultiSelect
- `maintenanceFeeDtlDialog.vue`：仅保留「质保期单位」zs-select 固定宽度 `width: 140px; flex: 0 0 140px;`（因在 flex 容器需明确宽度）

## 已移除的早期改动
- 早期曾在 element-ui.scss 为「表单项内容直接子元素是 .flex」增加 `.flex` 下每个直接子元素 `flex:1`、`width:...` 规则，最终未保留，改为对具体 zs-select 设固定宽度
- 移除了 `selectPopperMixin.js`、MultiSelect.vue 联动修改、maintenanceMode/measuringUnit 额外 `style="width: 100%"`
- 剩余 linter 报错仅存在于 maintenanceFeeDtlDialog.vue，属该文件原有类型提示噪音

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：SingleSelect.vue、maintenanceFeeDtlDialog.vue、element-ui.scss（诊断）、selectPopperMixin.js、MultiSelect.vue
- 所属项目：2-0（产品2.0）；来源会话：c442cea0-961e-4e15-b4e3-627396d2834e、074f871c-28c4-41be-986b-cadac0bc2bc2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_select_fix",
  "source_extraction_id": "3a52587429214e928da433b2513702f3",
  "version": 1,
  "memory_type": "entities"
}
-->