# 吸顶操作栏被固定列遮挡与按钮裁切
园区物管2.0 维修资金立项配置详情页吸顶按钮组被表格固定列遮挡、子表操作列按钮裁切的叠加根因与修复。

## 问题根因
- OperationBtnGroup 的 z-index 曾从 10 降到 1，Element UI 表格 fixed 列 z-index 为 10，吸顶层低于固定列被盖
- zs-operate-column 计算列宽时单元格 padding 按 24px 估算，全局样式实际为 padding:0 16px（共 32px），三个按钮时列宽偏小导致裁切

## 解决方案
- OperationBtnGroup z-index 提到 11（高于表格固定列 10 即可）
- zs-operate-column：内边距按 32px 估算、加 8px 宽度缓冲、新增 columnWidth 计算属性避免初始宽度 0、watch buttons 变化重算列宽
- Headline 展开态 overflow 设为 visible，避免子表格操作按钮被容器裁掉
- 排查同类「吸顶被固定列盖住」先对 z-index 数值，别先怀疑权限或渲染

## 验证与归属
- 验证：会话 bab7ae04 列明 z-index 10→1 被盖、24px 与 32px padding 偏差及三处修改
- 涉及文件：src/components/OperationBtnGroup/index.vue、src/components/zs-operate-column/zs-operate-column.vue、src/components/Headline/index.vue、src/views/maintenance/projectConfig/detail.vue
- 所属项目：园区物管2.0；代码基线 177bc3ce4；来源会话 bab7ae04-5ce6-4273-85a2-99300d7e520e

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "opbar_zindex_clip",
  "source_extraction_id": "79b34236c0554bfc9e14393689c2988b",
  "version": 1,
  "memory_type": "entities"
}
-->