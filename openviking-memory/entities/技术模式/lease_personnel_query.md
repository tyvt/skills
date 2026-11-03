# 租赁人员列表合并姓名查询并移除冗余name参数
`LeasePersonnelList.vue` 将从业人员姓名文案改为人员姓名并保留keyWord查询，删除冗余name参数。

## 查询变更
- 「从业人员姓名」文案改为「人员姓名」
- 保留 `keyWord` 查询，删除管理端冗余的 `name` 查询项
- 从 `queryParams` 中移除 `name` 参数

## 检索逻辑
- 姓名与编号统一通过首个「人员姓名」框检索
- 与列表列名一致

## 验证与归属
- 验证证据：extracted source=cursor session=650c4671-c56e-4c99-a92e-f35aae84a54f
- 涉及文件：LeasePersonnelList.vue、AgencyPersonnelList.vue、leasePersonnel/index.vue、leasePersonnel.js、lease-personnel-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：650c4671-c56e-4c99-a92e-f35aae84a54f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_personnel_query",
  "source_extraction_id": "154e1f80c9644439946847ff8e8bf216",
  "version": 1,
  "memory_type": "entities"
}
-->