# DetailTemplate 长 label 背景色高度不齐
园区物管2.0 中 DetailTemplate 类只读详情模板长字段 label 换行拉高行高后，同行右侧蓝底 label 背景色没跟着拉伸。

## 问题现象
- 长字段 label 换行拉高行高后，同行右侧（或空占位列）蓝底 label 背景色没跟着拉伸，出现高度不齐。

## 根因
- 空占位列写死 height: 44px 不随内容伸缩；label-area 用 align-items: center 时子项只按自身高度排布、未撑满整行。

## 解决方案
- 空占位列由固定 height 改 min-height: 44px + align-self: stretch，允许被撑高。
- .label-area 改 align-items: stretch，让背景铺满整格。
- .detail-label 补 flex: 1 + align-self: stretch。
- .detail-item 保留 min-height: 44px 作最小行高；核心原则：网格/行式布局占位与内容格必须用 stretch + min-height，禁止固定 height。

## 验证与归属
- 验证：032.md 会话 9d741535 detail-template.vue 四项修改，根因为固定 44px 占位列与 align-items: center。
- 涉及文件：src/components/detail-template.vue；所属项目：园区物管2.0；来源会话：9d741535-927f-4374-aff7-ef6d5c347226；代码基线：55cd8653c。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_label_stretch",
  "source_extraction_id": "88d68922b8ca46d2b8056d0afb581a2e",
  "version": 1,
  "memory_type": "entities"
}
-->