# 详情页表单抖动缺陷（滚动条槽位）
项目变更详情页部分分辨率下表单持续抖动，根因是内滚容器滚动条槽位不稳定，用 scrollbar-gutter: stable 预留槽位修复。

## 现象
- 某些屏幕分辨率下表单内容反复上下跳动，换机器不复现
- 仅当内容高度≈容器高度跨临界点时命中，表现为特定分辨率必现

## 根因
- 内滚动容器内容跨过滚动条出现/消失临界点，可用宽度变化引发重排抖动循环
- 滚动条槽位（scrollbar gutter）不稳定导致宽度变化

## 修复方案
- 内滚容器加 `scrollbar-gutter: stable` 预留槽位，跨临界点时宽度不变
- 改全局样式 `src/styles/index.scss` 而非逐页加，避免多页面各修
- 排查「某些分辨率复现」抖动先怀疑滚动条槽位/容器高度，而非调间距
- 改动聚焦：仅改 index.scss +9 行，按路径暂存，不夹带构建产物与临时脚本

## 涉及文件与验证
- 文件：src/styles/index.scss、src/views/building/projectChange/detail.vue
- 来源会话：session-a760b8e9-9a10-4358-9ae7-6e1c8f2b10a9（基线 c5d74f4）
- 提交：15523eab0 fix(detail) 仅改 index.scss +9 行，暂存纪律严格

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "scrollbar_gutter_jitter",
  "source_extraction_id": "12244aba6c2143ed925def5f8c54b8d0",
  "version": 1,
  "memory_type": "entities"
}
-->