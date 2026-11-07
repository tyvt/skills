# Element Plus 关闭图标弃用 el-icon-close 改用 Close 组件
zhi2-web-admin 在 Element Plus 下 class="el-icon-close" 已无对应字体图标，必须按需引入图标组件。

## 问题根因
- Element UI 时代的 class="el-icon-close" 在 Element Plus 中已无对应字体图标
- TagsView 等组件关闭叉号不显示

## 解决方案
- script 中 import { Close } from '@element-plus/icons-vue' 并注册
- 模板写 <el-icon class="close-icon" @click.prevent.stop="..."><Close /></el-icon>
- 样式选择器从 .el-icon-close 改为 .close-icon 保留 hover 尺寸

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 90372e07，关闭图标不显示，改为 Close 组件 + el-icon 包裹并更新样式类名
- 涉及文件：zhi2-web-admin/src/layout/components/TagsView/index.vue
- 所属项目：2-0（产品2.0）；来源会话：90372e07-25eb-4a0f-84f3-f63f39000430；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "element_plus_close_icon",
  "source_extraction_id": "4ed02f8bfd3c4575a720e18d89269ce4",
  "version": 1,
  "memory_type": "entities"
}
-->