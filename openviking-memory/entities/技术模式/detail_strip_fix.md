# 详情页底部白条与灰色遮挡修复
苏州市房地产监测V3 修复详情页底部白条、机构入网审核滚动异常及灰色条遮挡内容的问题。

## 问题根因
- `detail-container` 用 `height: calc(100vh - 120px)`，比实际可用区域多约 16px，底部露出白条
- 机构入网审核 Headline 直接挂在 `detail-container` 下，缺少 `detail-from-container`，滚动层级错误
- Headline 内 `el-table` 固定列在详情内滚时外溢，像灰条压在内容上

## 修改内容
- 全局 `index.scss`：详情页用 `height: 100%` + `app-main` flex 撑满，去掉底部多余 padding
- 顶栏 `operation-btn-group` 使用 `#f7f7f7` 背景与页面一致
- 未包 `detail-from-container` 的详情页：整页内滚 + 操作栏吸顶兼容旧页面
- `institutionRegister/detail.vue` 按上述结构修正滚动层级

## 涉及文件与归属
- 涉及：`index.scss`、`institutionRegister/detail.vue`、`AppMain.vue`、`styles` 目录
- 所属项目：苏州市房地产监测V3；来源会话：b69480f5-9aad-43ab-ad88-b4f7ea730209
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_strip_fix",
  "source_extraction_id": "a81ab6804080434d9486b5c33f4bda6b",
  "version": 1,
  "memory_type": "entities"
}
-->