# 备案信息变更 busCode 对账
苏州市房地产监测V3 核对三个「备案信息变更」流程的 busCode 与菜单配置一致性。

## 对账结果
- 开发企业变更：`qybgxq`，菜单已配且详情页 meta.busCode 一致
- 经纪机构变更：`jjjgbgxq`，菜单已配且一致
- 租赁机构变更：`zljgbgxq`，菜单未出现、无对应项，与前端常量及 `companyRecordChangeRoute.js` 回退逻辑一致（租赁侧只能等后续菜单或误用 `jjjgbgxq`）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyRecordChangeRoute.js`、`companyRecord.js`、`companyOrgan.js`
- 所属项目：苏州市房地产监测V3；来源会话：c777f773-e3dd-4546-82b0-7c8dc39476e8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buscode_reconcile",
  "source_extraction_id": "62dedeb762f4419ea3e8f6efbbe1b55c",
  "version": 1,
  "memory_type": "entities"
}
-->