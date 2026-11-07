# 提示语冗余场景描述且用抽象概念致歧义
园区公共收益项目(zhi2-web-admin)中，操作提示语含冗余场景描述且用抽象概念导致理解歧义，需改为直接可执行句式。

## 问题根因
- 原提示语含冗余操作场景描述，信息过载
- 使用抽象「选择未对账」概念，导致操作理解歧义

## 解决方案
- 改为「请将对账方式、对账状态均设置为「未对账」」直接可执行句式
- 与第 299 行提示语风格统一

## 涉及文件
- src/views/benefit/pubBankDetailDay/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：5ac0a40f-9d17-413b-8527-695560ab5344；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prompt_text_ambiguity",
  "source_extraction_id": "cfd7b23fcef747ecbde4acd045c019b6",
  "version": 1,
  "memory_type": "entities"
}
-->