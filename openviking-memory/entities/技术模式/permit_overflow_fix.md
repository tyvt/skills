# 预售许可新增页要件区溢出修复
苏州市房地产监测V3 中预售许可新增页因 Headline 组件 overflow 致要件列表撑破容器，已限高修复。

## 问题根因
- `Headline` 组件 `collapse-content` 默认 `overflow: visible`，要件列表加载后撑破右栏容器

## 修复内容
- 强制约束要件区域高度：`overflow: hidden !important` + `flex:1; height:0` 内部滚动
- 右栏双重限高：同步 `height` 与 `maxHeight` 与左栏一致
- 异步加载后触发 `layout-sync` 重新对齐高度

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：presale/permit、presale/permit/components/detail.vue、presale/permit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：80adc70b-981c-4804-9369-1f47d63c1006；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_overflow_fix",
  "source_extraction_id": "0c115a7a4e2d4c988b4d8dbe0f854d96",
  "version": 1,
  "memory_type": "entities"
}
-->