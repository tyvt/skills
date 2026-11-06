# 企业申请模块前端契约与后端分离
苏州市房地产监测V3 仓库仅含前端 `zhi2-web-admin`，企业申请相关后端在独立服务仓库。

## 仓库现状
- 本仓库只有前端（zhi2-web-admin），没有 Java Controller / Service / Entity / Mapper XML 等后端实现
- `/company/companyApply/page`、`/detail`、`/update` 需在后端独立服务仓库修改

## 前端契约
- API 定义：`zhi2-web-admin/src/api/company/companyApply.js`
- 列表 `companyApplyAudit/index.vue`：筛选用 `approvalRegion`，列表列也是 `approvalRegion`
- 详情 `companyApplyAudit/detail.vue`：已读 `companyApply.administrativeArea`，用 `ECONOMIC_INSTITUTIONS_REGION` 展示
- `update` 按 mixin 约定为 `POST /company/companyApply/update`，但当前前端未封装、未调用

## 字段差异
- `administrativeArea`：详情页已用；列表页仍用 `approvalRegion`（formatter 有 `approvalRegion || adm...`）

## 归属
- 所属项目：苏州市房地产监测V3
- 来源会话：1ac6ad00-db16-4fd7-aafc-8152e4a58b8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_apply_contract",
  "source_extraction_id": "006d2482687443a7a80ce2847fa57669",
  "version": 1,
  "memory_type": "entities"
}
-->