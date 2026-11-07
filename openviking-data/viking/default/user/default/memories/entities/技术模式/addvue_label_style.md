# add.vue信息有效期至误用区块标题样式
苏住房C移动端 pages_transaction/intention/add.vue 中「信息有效期至」误用区块标题样式，而非表单项 label 样式。

## 问题根因
- add.vue 中「信息有效期至」误用区块标题样式（24rpx/#a2a2a2）
- 正确应为表单项 label 的 32rpx/#333

## 修复要点
- 修改该文件 41-43 行 view 类为 font-(32 weight-400 color-333) leading-44
- 与 uni-forms-item__label 一致

## 涉及文件
- src/pages_transaction/intention/add.vue

## 验证与归属
- 验证证据：extracted source=cursor session=452e5168-2d2e-4d7b-ad71-56eaaee8ce39
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：452e5168-2d2e-4d7b-ad71-56eaaee8ce39；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "addvue_label_style",
  "source_extraction_id": "bac8a29b0640417db020196152582699",
  "version": 1,
  "memory_type": "entities"
}
-->