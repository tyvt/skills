# 租赁机构变更busCode未配致回退误用
苏州市房地产监测V3 中约定备案变更 busCode 集合，但菜单缺失租赁机构变更致回退逻辑误用编码。

## 约定与配置
- 备案变更 busCode 约定为 `qybgxq`、`jjjgbgxq`、`zljgbgxq`
- 实际配置菜单缺失租赁机构变更 `zljgbgxq`，且未在 listRouters 配置也无菜单项

## 问题影响
- 回退逻辑位于 `companyRecordChangeRoute.js`，前端常量与之回退逻辑一致
- 未配菜单时将误用经纪编码 `jjjgbgxq`，租赁侧误用经纪机构回退，需补菜单或修正回退

## 涉及文件
- `src/api/company/companyRecord.js`
- `src/constants/companyOrgan.js`
- `src/utils/companyRecordChangeRoute.js`
- `路由信息.json`、`src/store/modules/permission.js`、`src/api/institution/institutionRegister.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/127.md、src=苏州市房地产监测V3/170.md
- 来源会话ID：c777f773-e3dd-4546-82b0-7c8dc39476e8
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_buscode_menu",
  "source_extraction_id": "295ffa7531404838aa299598fc454f39",
  "version": 2,
  "memory_type": "entities"
}
-->