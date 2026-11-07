# 标签内边距导致文字换行修复
苏州市房地产监测V3 的 detail-template.vue 修复了标签 padding 改为 16px 后文字换行的问题。

## 问题根因
- 标签区宽度按 LABEL_HORIZONTAL_PADDING + 字数 × 14px 计算，常量仍为 30（左右各 15px）
- .detail-label 已是 padding: 12px 16px（左右合计 32px），内容区少 2px
- 样式里 white-space: normal 和 word-break: break-all 使标签易折行

## 修改内容
- 将 LABEL_HORIZONTAL_PADDING 改为 32，与 16px 左右内边距对齐
- 标签主文案使用 white-space: nowrap 并去掉 word-break: break-all，保证单行显示
- 上方 labelAbove 仍可按多行展示不受影响

## 涉及文件与归属
- 涉及文件：src/components/detail-template/detail-template.vue
- 所属项目：苏州市房地产监测V3；来源会话：9eb9749f-5afe-4f68-a8c6-813dd931775b
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "label_wrap_fix",
  "source_extraction_id": "4b2de2a5bed3429c8dadec66071ab087",
  "version": 1,
  "memory_type": "entities"
}
-->