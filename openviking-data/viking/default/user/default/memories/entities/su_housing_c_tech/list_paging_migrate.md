# 业主端列表页分页迁移
苏住房C 小程序 `pages_owner` 下所有列表页已从 `useLoadMore` / `uni-load-more` 迁移到 `usePaging` + `z-paging`。

## 修改范围
- 涉及 26 个文件，包括 `src/pages_owner/authentication/family/index.vue`、`src/pages_owner/authentication/owner/index.vue`、`src/pages_owner/authentication/tenant/index.vue`、`src/pages_owner/building/info/index.vue`、`src/pages_owner/committee/application/announcement.vue`、`src/pages_owner/community/announcement/index.vue`、`src/pages_owner/company/housekeeper/index.vue`、`src/pages_owner/company/service/index.vue`、`src/pages_owner/company/staff/index.vue` 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：7024cb11-2918-467a-b059-55fd7409fdbc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "list_paging_migrate",
  "source_extraction_id": "7e3e0be08a0d49459cf6cdab5cb477e0",
  "version": 1,
  "memory_type": "entities"
}
-->