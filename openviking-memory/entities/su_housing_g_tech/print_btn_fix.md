# 打印配置页新增按钮不显示修复
苏住房G 打印配置页因合并恢复业务代码时丢失 `table-container` 包裹层，导致「新增」按钮被挤出可视区域，已恢复布局结构并增加校验修复。

## 问题原因
- `develop/v2.6.2` 合并恢复业务代码时，打印配置页丢失 `table-container` 包裹层
- 左侧 `MenuTree`（200px）+ 右侧 `list-card`（`width: 100%`）在横向 flex 布局下总宽度超出容器
- 操作按钮右对齐被挤出可视区域，看起来像「新增」按钮没显示

## 修复方案
- 按同类型 `fjflpz/index.vue` 恢复布局：`list-container (flex row)` → `menu-tree` + `table-container (width: calc(100% - 200px))` → `list-card`（表格+操作按钮）+ `PrintDialog`
- 为 `handleAdd` 增加 `busCode` 校验：需先选左侧菜单树业务编码，否则提示「请先选择左侧菜单业务编码」

## 验证与归属
- 刷新验证「新增」「删除」按钮是否正常显示；若仍看不到，打开控制台查看 `[权限不足]` 警告
- 按钮权限标识为 `print:config:add`，需在角色权限中配置
- 涉及文件：`fjflpz/index.vue`、`src/views/tool/print/index.vue`、`src/mixins/subTableMixins.js`、`src/mixins/table.js`、`src/mixins/permsMixins.js`
- 所属项目：苏住房G（zhi2-web-admin）；来源会话：d409e8fd-ad8b-47a8-999b-763e63e18e32；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "print_btn_fix",
  "source_extraction_id": "4fe6b1917a3649f084f7bb0c722beae5",
  "version": 1,
  "memory_type": "entities"
}
-->