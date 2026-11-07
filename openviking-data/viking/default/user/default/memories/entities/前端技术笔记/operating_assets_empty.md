# operatingAssets无数据空白修复
operatingAssets.vue 在资产明细无数据时未显示占位，已添加“暂无数据”条件渲染与样式。

## 问题根因
- 表格 body 区域未处理 tableRows.length === 0 的空状态
- 原 bug 反馈接口有数据但页面没展示，实际修复为空状态展示

## 解决方案
- 在表格 body 增加条件渲染：tableRows.length > 0 渲染列表，否则显示 <div class="operating-assets__table-empty">暂无数据</div>
- 新增 operating-assets__table-empty 样式，保证明细区域内居中展示
- 修改文件 src/views/benefit/statisticsMap/operatingAssets.vue，无新增 lint 报错

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话ID：009b156c-7e38-4831-9716-5483987c41c5
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "operating_assets_empty",
  "source_extraction_id": "aaadbf8ca9be4ccba8e374a3527b183d",
  "version": 1,
  "memory_type": "entities"
}
-->