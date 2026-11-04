# MP分支报修列表旧参数导致空数据修复
MP分支报修列表因使用旧接口参数导致返回空数据，已对齐 suzhou-shiqu-suzhufang-main-v2.1 分支的参数与字段映射。

## 问题根因
- `repair/index.vue` 列表请求使用旧参数 `eventType`、`eventStates`、`startTime`/`endTime`（带时分秒）等，导致接口返回空数据
- 旧参数与 main2.1 差异：`eventType`→`orderType`、`eventStates`→`orderStatus`、`eventDesc`/`orderContent`→`keyWord`、传 `houseId`/`complexId`（应不传，后端按登录用户返回）

## 修复方案
- 请求参数对齐 main2.1：使用 `orderType`、`orderStatus`、`keyWord`、`startDate`/`endDate`（纯日期），不传 `houseId`/`complexId`
- 响应字段映射对齐：`orderContent`→`remark`、`submitTime`→`date`、`orderStatus`→`state`，状态字典使用 `work_order_status`
- `repair/index.vue` 详情跳转增加 `source` 参数；前往报修/报事时传递 `houseId`、`facilityId`

## 验证与归属
- 验证证据：src=pages_owner_extra/001.md；来源会话ID：d7c6bb90-123e-48a6-b85b-c6fd05eafa28
- 涉及文件：src/pages.json、src/pages_owner_extra/ownerCard/index.vue、src/api/property.js、src/pages_owner/repair/index.vue、src/pages_owner/repair/components/RepairCard.vue、src/pages_owner_extra/repair/index.vue、src/pages_owner_extra/repair/submit.vue、src/pages_owner_extra/repair/components/RepairCard.vue、src/store/repair.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "repair_list_param_fix",
  "source_extraction_id": "600632283a4b4c67ba78f7389999c84c",
  "version": 2,
  "memory_type": "entities"
}
-->