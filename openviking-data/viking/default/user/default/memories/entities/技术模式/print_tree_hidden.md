# 打印配置页左侧树被表格挤压不显示
泰兴G 打印配置页因 list-card 直接放在 list-container 占满整行，左侧 menu-tree（200px）被挤压消失，附件配置页正常。

## 问题根因
- 全局样式 .list-card 设置 width:100%
- 打印页把 list-card 直接放在 list-container 里，与左侧 menu-tree 并排时右侧表格占满整行，把树挤没
- 附件配置页（fjflpz/index.vue）用 table-container（width:calc(100% - 200px)）包了一层，所以显示正常

## 解决方案
- 按附件配置页结构，给 list-card 和 PrintDialog 外面加 table-container 包裹层（width:calc(100% - 200px)）
- 刷新打印配置页后左侧树正常显示

## 验证与归属
- 所属项目：泰兴G
- 验证：extracted source=cursor session=e60200f4-3211-4dd2-b804-4418f9454b81
- 涉及文件：zhi2-web-admin/src/views/tool/print/index.vue、components/MenuTree/index.vue、fjflpz/index.vue
- 来源会话：e60200f4-3211-4dd2-b804-4418f9454b81；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "print_tree_hidden",
  "source_extraction_id": "45146488f5bd4e3b8e06716675a0c458",
  "version": 1,
  "memory_type": "entities"
}
-->