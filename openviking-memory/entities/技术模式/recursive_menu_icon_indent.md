# RecursiveMenu 子菜单图标占位缩进
园区物管2.0 侧边栏 RecursiveMenu 子菜单缩进不应依赖图标占位，icon 为 null 时文字会比父级更靠左。

## 问题根因
- RecursiveMenu.vue 中子级叶子节点 paddingLeft 固定为父级 24px + 18 = 42px
- 图标区域只在 getMenuIcon(child) 有值时才渲染（约 24px 占位：16px 图标 + 8px 间距）
- 后端菜单「督办记录」等子项 icon 为 null 无占位，文字起始 42px 比父级文字约 48px 靠左 6px；「知识库」子项 icon:"#" 占位碰巧补齐

## 解决方案
- 禁止用「给无图标子菜单也配 icon:"#"」治标方案
- 在 RecursiveMenu.vue 让子菜单无论有无图标都保留等宽图标占位，或统一按 level 计算 paddingLeft，使缩进不依赖子项是否带 icon
- 排查同类「缩进忽对忽不对」问题时，先对比各菜单 meta.icon 配置差异

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：工单管理子项 icon=null（文字 42px 比父级靠左 6px），知识库子项 icon="#" 正常；根因是 v-if="getMenuIcon(child)" 条件渲染图标占位；修复为保留等宽占位或按 level 算 paddingLeft
- 涉及文件：zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：园区物管2.0；代码基线：f101dd464；来源会话：58620e57-ed5e-40f6-8987-65c3a9dd1603

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recursive_menu_icon_indent",
  "source_extraction_id": "53246eca93fe4b4fb7a3b7d493699f83",
  "version": 1,
  "memory_type": "entities"
}
-->