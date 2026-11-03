# 新增选组织先校验后回填
园区物管2.0 中新增模式下选择组织先校验唯一性再回填，防止重复提交。

## 实现要点
- 新增模式在 onOrganizationSelected 先请求 GET /autonomy/ownerCommitteeUser/checkUserUnique/{committeeVersionId}
- 校验通过调用 applyOrganizationSelected 回填，失败由 request.js 拦截器弹 msg
- 编辑/查看模式直接回填，不重复校验
- applyOrganizationSelected 中切换组织时 clearMemberFields 清空人员

## 验证与归属
- 来源会话：0b6fbcaa-8497-4ce6-9f47-939444f93d40
- 涉及文件：autonomy/userAuth/detail.vue、autonomy/record/components/detail.vue、property/localPropertyWin/detail.vue、mixins/detailMixins.js、utils/request.js、autonomy/userAuth/index.vue、request.js
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_select_validate_first",
  "source_extraction_id": "7e48a78fbccf49ae99401e76e5772baa",
  "version": 1,
  "memory_type": "entities"
}
-->