# 预售许可预公告列表加筛选条件
苏州市房地产监测V3 中预售许可预公告列表按图红色标注增加筛选条件，表格列有名称。

## 实现要点
- 按图中红色标注修改，增加一个筛选条件，表格列有一个名称
- eslint 检查未引入新问题

## 校验注意
- 剩余的 `import/no-unresolved` 与缩进报错在原文件已存在
- 原因是 eslint 在仓库根目录运行无法解析 `@` 别名，与本次改动无关

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：src/views/presale/cashsale/cashsaleListMixin.js、src/views/presale/permit/components/index.vue、presale/permit/components/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：session_08aa1b0852b93beea14c8ebfce90d7d7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_presale_filter",
  "source_extraction_id": "fcff1f14acef43488e3cda24084218b0",
  "version": 1,
  "memory_type": "entities"
}
-->