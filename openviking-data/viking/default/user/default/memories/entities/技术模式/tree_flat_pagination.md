# 部门树平铺态分页消失修复
苏住房G 部门树 RegionTreeLayout 从树形切到「平铺展示」后列表底部翻页组件被裁掉，需三层联动修复。

## 问题根因
- 平铺态搜索区字段更多、整体高度超出视口，.list-card 用 flex: 0 0 auto 不参与收缩
- 父级 .type-right 是 overflow: hidden，超出部分（分页）被静默裁掉，属高度链断裂而非分页组件本身问题

## 解决方案
- RegionTreeLayout.vue 新增 type-right-body 中间容器，搜索区 0 0 auto、列表区 flex:1 + min-height:0 正确分配高度
- index.scss 让部门树列表页 list-card 占满剩余高度、表格区滚动、分页固定底部
- 相关页面（complex / complexChange / housePart）的 zs-table 加 fill-height 让表格高度随容器自适应
- 只改其中一层仍会复发；同构列表页是复制关系时要一并核对

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 2f89b7ab 用户反馈平铺展示时列表下缺少翻页；结论为 type-right 的 overflow:hidden 裁掉分页
- 涉及文件：property/complex/components/RegionTreeLayout.vue、property/complex/index.vue、property/complexChange/index.vue、benefit/housePart/index.vue
- 所属项目：苏住房G；来源会话ID：2f89b7ab-13d9-4f37-a91e-45c7f05466ed；代码基线：26069c8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_flat_pagination",
  "source_extraction_id": "4c74f7a87e624832885083b5159980bf",
  "version": 1,
  "memory_type": "entities"
}
-->