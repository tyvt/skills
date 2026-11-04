# 复制筛选页须全链路改占位符与校验文案
从 PropertyPages.vue 等页复制筛选表单到 InformationPages.vue 时，placeholder、label、校验提示必须随字段语义一起修改。

## 问题背景
- 合同防伪码页曾误留「请输入公司名称」，根因是从 PropertyPages 复制未改
- InformationPages.vue:41 原 placeholder 仍为「请输入公司名称」，已改为「请输入合同防伪码」

## 规范要点
- 复制筛选表单后，placeholder、label、校验提示须随字段语义全链路修改
- E2E 若仅用 getByLabel 定位可能仍通过，需做字段级对照清单核对用户可见文案

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue、PropertyPages.vue
- 所属项目：门户；来源会话ID：session_22f9c2a02bf40d8445837a059adeed0f；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "copy_filter_placeholder",
  "source_extraction_id": "7ed1be87bcc64a9fbec80efd548ede5b",
  "version": 1,
  "memory_type": "entities"
}
-->