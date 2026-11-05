# zs-button图标映射缺失修复
zs-button 通过 ICON_MAP 将 el-icon-xxx 映射到 Element Plus 图标，原映射缺失致 Process/index.vue 图标不显。

## 问题根因
- zs-button 通过 ICON_MAP 将 el-icon-xxx 映射到 Element Plus 图标
- 原映射缺失 folder-opened/circle-plus 等导致 Process/index.vue 中 el-icon 不显示

## 解决方案
- 在 zhi2-web-admin/src/components/zs-button/zs-button.vue 补齐 Process 工具栏用到的映射（folder-opened、circle-plus、rank、zoom-out、back、right、view、picture 等）
- 补齐后图标正常渲染
- 引入的 Element Plus 图标组件：Plus、CirclePlus、Delete、Edit、Search、Check、View、Upload、Download、MoreFilled、Menu

## 验证与归属
- 涉及文件：Process/index.vue ; zhi2-web-admin/src/components/zs-button/zs-button.vue
- 所属项目：2-0；代码基线：none
- 验证证据：src=2-0/016.md
- 来源会话ID：91a5f155-a144-499d-bf66-aac2cc418b96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_button_icon_map",
  "source_extraction_id": "61a33b5fab654f63a4728d9b086afb8c",
  "version": 2,
  "memory_type": "entities"
}
-->