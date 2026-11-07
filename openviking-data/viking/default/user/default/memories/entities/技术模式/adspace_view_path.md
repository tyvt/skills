# 广告位查看路由路径错误修复
产品2.0 公共查询详情页点击广告位列表「查看」时，因路由路径写错导致提示无权限，实为路径错误。

## 问题原因
- `advertiseTable.vue` 的 `handleView` 跳转路径误写为 `benefit/pubAdvertiseSpaceDetail/detail`
- 项目中不存在该页面路由（`pubAdvertiseSpaceDetail` 只是子表 API，无独立详情页）
- `getRouterPathByFilePath` 在授权菜单找不到路由时提示「没有授权相关菜单」，掩盖了真实路由错误

## 修复要点
- 正确路径应为 `benefit/pubAdvertiseSpace/detail` + 主键 + query formMode
- 从菜单进入时 `listMixins` 使用 `${this.$route.path}/${id}` 即正确路径

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/components/advertiseTable.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/parkingTable.vue（同类参考）

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：36a17d3e-c6f3-43ee-ac8c-949fca0f9cbd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "adspace_view_path",
  "source_extraction_id": "3f14e79c13954057ad98487b06daa383",
  "version": 1,
  "memory_type": "entities"
}
-->