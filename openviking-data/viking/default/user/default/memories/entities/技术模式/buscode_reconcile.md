# 备案信息变更 busCode 对账
苏州市房地产监测V3 核对三个「备案信息变更」流程的 busCode 与菜单配置一致性。

## 对账结果
- 开发企业变更：`qybgxq`，菜单已配且详情页 meta.busCode 一致
- 经纪机构变更：`jjjgbgxq`，菜单已配且一致
- Lease org change: `zljgbgxq`; `companyRecord.js` now exports `LEASE_CHANGE_FLOW_BUS_CODE = 'zljgbgxq'` (added 2026-11-11 beside `LEASE_CHANGE_APPENDIX_BUS_CODE`), but the menu is still not configured and `companyRecordChangeRoute.js` fallback lacks a lease branch (`AgencyBasicInfoDetail.vue:240` references the constant directly).

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyRecordChangeRoute.js`、`companyRecord.js`、`companyOrgan.js`
- 所属项目：苏州市房地产监测V3；来源会话：c777f773-e3dd-4546-82b0-7c8dc39476e8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buscode_reconcile",
  "source_extraction_id": "12a4bc7ea2fa4bd3be363b4606f83214",
  "version": 2,
  "memory_type": "entities"
}
-->