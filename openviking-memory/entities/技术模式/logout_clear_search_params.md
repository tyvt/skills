# 切换账号部门筛选残留修复
苏住房G 项目中退出登录未清空缓存导致换账号后部门筛选残留的技术修复记录。

## 问题根因
- 退出登录时未清空 Vuex 中的 cachedSearchParams（含 parentDeptId），换账号后 listMixins 和 RegionTreeLayout 恢复上一账号的部门筛选

## 修复方案
- 在 src/store/modules/user.js 的 LogOut 和 FedLogOut 中，退出时增加 `dispatch("common/clearAllSearchParams", null, { root: true });`
- 退出登录清空 cachedSearchParams，换账号后不再恢复上一账号部门筛选

## 验证与归属
- 验证步骤：物管办登录→区域树选部门→退出→物业账号登录→确认列表为物业自身数据，parentDeptId 未残留
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/store/modules/user.js、src/views/property/complex/components/RegionTreeLayout.vue、src/views/property/complex/index.vue
- 来源会话ID：c14c5230-321b-471a-a40a-e48d33f20dbb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_clear_search_params",
  "source_extraction_id": "6c1f939346714376a840e7687a9737f5",
  "version": 1,
  "memory_type": "entities"
}
-->