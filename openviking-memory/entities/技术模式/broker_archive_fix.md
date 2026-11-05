# BrokerPages 机构档案列空列修复
BrokerPages.vue 的「机构档案」列在分支机构列表与经纪人员列表中为空，需补渲染「基本信息」按钮。

## 问题根因
- 「机构档案」列插槽仅在机构总列表（state==='list' 且 kind==='agencies'）渲染
- 进入分支机构列表（view=stores）或经纪人/机构经纪人员列表（isBrokerList）条件不成立，第三列空白

## 修改方式
- 在分支机构列表及 isBrokerList 中也显示「基本信息」按钮
- 点击仍走已有 openRecord（分支机构进入 store-detail）
- 刷新后经纪机构 → 某机构 → 分支机构列表应出现「基本信息」按钮；若看不到需硬刷新或重启 dev 服务

## 涉及文件与归属
- BrokerPages.vue、public-portal-interactions.spec.ts
- 所属项目：门户；来源会话ID：01c99a3c-2693-474a-bcc9-5c73f2538cbe

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_archive_fix",
  "source_extraction_id": "f32c83e1c8fe4363aa3e476f149c79ff",
  "version": 1,
  "memory_type": "entities"
}
-->