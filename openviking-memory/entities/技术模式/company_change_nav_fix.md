# 机构变更详情列表跳转逻辑修复
苏州市房地产监测V3 项目修复经纪/租赁机构变更列表跳转详情页路由错误及从业人员详情页初始化失效问题。

## 问题根因
- `companyChangeManage/index.vue` 的 `navigateToChangeDetail` 一律先走「基本信息变更」路由，未按 `busCode` / 变更类型区分
- 导致「从业人员信息」也进入机构基本信息变更页，用变更单 ID 调备案 `detail` 出现 400
- `AgencyPersonnelDetail` 从变更列表带 `personnelRecordChangeId` 进入时 `init()` 不被 `formMode` 监听，`inPageChangeMode` 未生效，仍用路由 `id` 请求错误接口

## 修改要点
- `companyChangeManage/index.vue` 新增 `resolveChangeDetailTarget`，先按 `busCode` 解析
- 仅 `jbxxbg`/`qybgxq` 或文案含「基本信息」走机构基本信息页；从业人员按 `organType` 落到 `jgcyrybg`

## 验证与归属
- 涉及文件：`companyChangeManage/index.vue`、`AgencyPersonnelDetail.vue`、`LeasePersonnelDetail.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：75a612f1-9c9e-4b32-8b51-9ebc77e6ee9f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_nav_fix",
  "source_extraction_id": "e5756bdd8c034e2494a05870d03ebaea",
  "version": 1,
  "memory_type": "entities"
}
-->