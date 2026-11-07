# col-16负margin对齐楼幢号全角括号右缘
同行 col-16 较两个 col-8 右缘少 gap/3，采用宽列加 flex 布局并补负 margin 使楼幢号全角括号对齐。

## 问题现象
- 同行 col-16 较两个 col-8 右缘少 gap/3（约 10.67px），致楼幢号全角括号未对齐

## 修复方案
- 采用宽列 col-16 加横向 flex 布局，主输入 flex:1 占满，楼幢号居右
- 添 margin-right: calc(-1 * var(--detail-collapse-col-gap,32px)/3) 使其右缘与上一行搜索框对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/139.md
- 涉及文件：supervision/agreement/jgxm/detail.vue、index.scss、detailLayout.js、detail-form.scss、Headline/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：89648bd7-808a-4f32-89c3-6c9506a150c8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "col16_neg_margin",
  "source_extraction_id": "c15196f322ff4716b99fce5066c00e99",
  "version": 1,
  "memory_type": "entities"
}
-->