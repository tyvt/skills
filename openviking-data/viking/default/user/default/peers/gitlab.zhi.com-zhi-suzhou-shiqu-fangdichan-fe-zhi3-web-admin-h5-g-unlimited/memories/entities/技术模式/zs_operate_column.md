# zs-operate-column 公共操作列组件
zhi2-web-admin 列表与子表格的标准操作列公共组件，由 table.js 的 buttons 配置驱动，全站 370+ 处使用。

## 用途
- 统一渲染表格操作列按钮，自动处理列宽、样式、权限与多按钮折叠
- ListTemplate.js 与 DetailSubTableTemplate.js 均通过 `<zs-operate-column :buttons="buttons" />` 使用

## API 形态
- 接收 `buttons` 数组，每项含 `label` 与 `function(row, column, index)`
- 可选字段：`disabled(row)`、`visible(row)`、`attrs`、`permissionType`、`permission`
- 内部 `getRowButtons`：无 `visible` 且 `!button.permission` 时返回该按钮
- `attrs` 透传底层 zs-button，可携带 `data-testid` 等测试属性

## 使用约定
- 使用 listMixins 的自定义子表可覆写 `buttons` computed 替换手写 `<zs-table-column>` + 内联 `<zs-button>`
- 删除按钮由组件统一补 `danger + plain` 样式
- 全局注册于 tableComponents.js，经 table.js → listMixins 混入链自动可用

## 关联事实
- PresaleHouseTable.vue 原自绘操作列，已于 2026-11-09 重构为 zs-operate-column（子模块提交 f8b288c2b）
- 同类自绘操作列候选（本次未改）：BuildingTableList.vue、LpbHouseList.vue 等

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "zs_operate_column",
  "source_extraction_id": "b95af25244944dccbfa7abaa8f4ab82a",
  "version": 1,
  "memory_type": "entities"
}
-->