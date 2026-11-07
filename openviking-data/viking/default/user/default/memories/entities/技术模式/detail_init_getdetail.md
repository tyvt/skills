# 详情组件覆盖 init 而未调用 getDetail

在项目 苏州市房地产监测V3 中，文件 `staffManagement/components/detail.vue` 和 `toB/personnelRecord/components/detail.vue` 覆盖了 `detailMixins` 的 `init()`，仅处理新增逻辑，在查看/编辑时未调用 `getDetail()`，导致缺少详情请求。

## 问题根因
- `zhi2-web-admin/src/views/company/staffManagement/components/detail.vue` 覆盖 `detailMixins.init()`，仅处理新增
- `zhi2-web-admin/src/views/toB/personnelRecord/components/detail.vue` 在查看/编辑时也未调用 `getDetail()`
- 导致打开时缺少详情请求

## 修复
- 增加 `getId()` 检查，并在 `init()` 末尾调用 `getDetail()`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：d82ce8b3-d375-424f-ba1f-1a0ccfc69dc2
- 验证证据: src=苏州市房地产监测V3/110.md
- 涉及文件: 路由信息.json, src/api/company/personnelRecord.js, personnelListManageMixin.js, staffManagement/components/index.vue, staffManagement/components/detail.vue, listMixins.js, detailMixins.js, staffManagement/personnelRecordApply/index.vue
- 所属项目: 苏州市房地产监测V3; session: d82ce8b3-d375-424f-ba1f-1a0ccfc69dc2; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_init_getdetail",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->