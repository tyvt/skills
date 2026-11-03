# 租赁机构变更busCode未配致回退误用
苏州市房地产监测V3 中约定备案变更 busCode 集合，但菜单缺失租赁机构变更致回退逻辑误用编码。

## 约定与配置
- 备案变更 busCode 约定为 `qybgxq`、`jjjgbgxq`、`zljgbgxq`
- 实际配置菜单缺失租赁机构变更 `zljgbgxq`

## 问题影响
- 回退逻辑位于 `companyRecordChangeRoute.js`
- 未配菜单时将误用经纪编码 `jjjgbgxq`，需补菜单或修正回退

## 涉及文件
- `src/api/company/companyRecord.js`
- `src/constants/companyOrgan.js`
- `src/utils/companyRecordChangeRoute.js`
- `路由信息.json`、`src/store/modules/permission.js`、`src/api/institution/institutionRegister.js`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/127.md
- 来源会话ID：c777f773-e3dd-4546-82b0-7c8dc39476e8
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_buscode_menu",
  "source_extraction_id": "d5003cc58ed741acbc25c5ea5b23b3df",
  "version": 1,
  "memory_type": "entities"
}
-->