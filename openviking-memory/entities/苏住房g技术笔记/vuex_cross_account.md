# [苏房] Vuex cachedSearchParams 跨账号残留
物管办账号选部门树节点退出，再用物业账号登录同列表，数据仍按物管办 parentDeptId 过滤，像串号。

## 问题现象
- 物管办账号登录进物业管理区域列表选部门树节点，退出，再用物业账号登录进同一列表，数据仍按物管办 parentDeptId 过滤
- 分别登录两账号都正常，仅「先登A、退出、再登B」复现

## 根因
- parentDeptId 写进 Vuex common 模块 cachedSearchParams，user 模块 LogOut/FedLogOut 只清 token 与用户信息，没清列表搜索缓存
- listMixins 与 RegionTreeLayout 在 mounted 无条件从缓存恢复筛选，把上一账号上下文带进新会话

## 解决方案
- 在 store/modules/user.js 的 LogOut 与 FedLogOut 两 action 都加 dispatch('common/clearAllSearchParams', null, { root: true })
- 两个登出入口都要加，只改一个会 FedLogOut 路径残留
- 加跨 root dispatch 必须显式传 { root: true }
- 凡为返回保持筛选新增到 cachedSearchParams 的字段，若属账号/机构维度必须进登出清理清单，否则跨账号串味

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证会话 c14c5230（064.md 会话 c14c5230）：诊断 parentDeptId 退出未清理，在 LogOut 与 FedLogOut 补 dispatch('common/clearAllSearchParams', null, { root: true }) 清空缓存
- 涉及文件：store/modules/user.js、store/modules/common.js、mixins/listMixins.js、property/complex/components/RegionTreeLayout.vue
- 所属项目：苏住房G；代码基线：2a3ef8a；来源会话ID：c14c5230-321b-471a-a40a-e48d33f20dbb

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "vuex_cross_account",
  "source_extraction_id": "e5fee5879ff946e5b6c2d05414479365",
  "version": 1,
  "memory_type": "entities"
}
-->