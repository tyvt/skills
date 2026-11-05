# 部门树平铺展示翻页缺失修复
苏住房G 项目部门树在「平铺展示」时列表底部翻页组件被裁切，已通过布局调整修复。

## 根因
- 平铺展示时搜索区字段更多，整体高度超出视口
- .list-card 使用 flex: 0 0 auto 不会收缩，分页被 .type-right 的 overflow: hidden 裁掉

## 修改内容
- RegionTreeLayout.vue 新增 type-right-body 容器，让搜索区和列表区在 flex 布局中正确分配高度
- index.scss 中 list-card 占满剩余高度，表格区域可滚动，分页固定在底部
- complex/index.vue、complexChange/index.vue、housePart/index.vue 为 zs-table 增加 fill-height

## 验证与归属
- 切换到「平铺展示」后列表底部应正常看到翻页组件
- 涉及文件：RegionTreeLayout.vue、index.scss、complex/index.vue、complexChange/index.vue、housePart/index.vue
- 所属项目：苏住房G；来源会话ID：2f89b7ab-13d9-4f37-a91e-45c7f05466ed

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dept_tree_pagination",
  "source_extraction_id": "430d6ab35af442f69d0d52b3be24b130",
  "version": 1,
  "memory_type": "entities"
}
-->