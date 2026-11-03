# 变更角标比对抽离mixin忽略日期格式差异
苏州市房地产监测V3 中资质与从业人员变更角标比对逻辑重复，抽离为 changeObjectMixins.js 统一处理并忽略日期格式差异。

## 问题背景
- 资质与从业人员变更角标比对逻辑重复，维护困难
- 日期格式差异导致比对误报

## 修复方案
- 新增 src/mixins/changeObjectMixins.js 统一处理变更角标比对
- qualificationManagement/components/detail.vue 重写 detailCallback 写入快照
- changeBadgeValue 逐字段比对，日期仅比对 yyyy-MM-dd 防格式误报
- changeObject 为空时回落 originInfo 跳过比对

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/037.md
- 涉及文件：changeObjectMixins.js、qualificationManagement/components/detail.vue、companyRecord.js、router/index.js、zs-search-form.vue、companyApplyAudit/index.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：57beaecb-baa4-4b9f-8dba-33b703218dcd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "变更角标比对抽离mixin",
  "source_extraction_id": "d1fd2d535d084329aeea42aa9e091a66",
  "version": 1,
  "memory_type": "entities"
}
-->