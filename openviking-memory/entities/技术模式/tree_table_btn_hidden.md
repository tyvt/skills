# 左树右列表页新增按钮被溢出挤出
苏住房G项目打印配置等「左菜单树(200px)+右列表」布局页表格正常但右上角「新增」「删除」按钮看不到，根因为布局溢出。

## 问题根因
- 合并分支/恢复业务代码时丢失中间table-container包裹层，右栏list-card直接落进横向flex并带width:100%
- 200px树+100%右栏=超出容器宽度，操作按钮右对齐定位被挤出可视区，表现像「按钮没渲染」
- 最易误判为权限不足或v-if条件不成立，实际是纯布局溢出

## 解决方案
- 按同类正确页（fjflpz/index.vue）恢复三层结构：list-container(flex row)→左menu-tree，右table-container显式width:calc(100% - 200px)→里面放list-card（表格+操作按钮）和弹窗
- 排查：元素面板看按钮节点是否存在DOM（存在=布局问题，不存在=条件/权限），再看右栏计算宽度是否等于父容器100%
- 顺手补busCode校验提示（请先选择左侧菜单业务编码），避免按钮修好后点下去还是空

## 验证与归属
- 验证：会话d409e8fd用户报tool/print/index.vue「新增按钮不显示」，结论指develop/v2.6.2合并恢复丢失table-container，按fjflpz恢复结构并为handleAdd增busCode校验
- 涉及文件：tool/print/index.vue、mixins/subTableMixins.js、components/zs-button/zs-button.vue
- 所属项目：苏住房G；代码基线：9fb6c2c；来源会话：d409e8fd-ad8b-47a8-999b-763e63e18e32

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_table_btn_hidden",
  "source_extraction_id": "d2b47756a3ff4649b774baa576cac35f",
  "version": 1,
  "memory_type": "entities"
}
-->