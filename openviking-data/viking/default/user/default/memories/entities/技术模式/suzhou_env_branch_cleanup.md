
# 残留的苏州环境分支清理完成
苏州市房地产监测V3 项目中，在 6 个文件中完成清理，全部移除 `isSuzhouzhizai` 与 `currentEnvironment` 分支，统一保留通用逻辑。

## 问题根因
- `exchangeContract/index.vue` 等文件保留 `isSuzhouzhizai` 和 `currentEnvironment` 分支
- 环境分支耦合逻辑并阻碍文件间统一

## 完成变更
- `exchangeContract/index.vue`：搜索项与列表列固定为「监管项目」+「项目名称」通用结构
- `contractView/index.vue`：保留「楼幢号」列，移除苏州专属的公安/施工楼幢号及已缴款金额列
- `BranchOneDialog.vue`：移除盐城默认省市逻辑与 `filtrNotWord` 参数，保留 `isSupervisionBank` 通用判断
- `pubRegulatoryStopAgreement/.../BuildSelectDialog.vue`：`getList` 固定使用 `/building/buildinginfo/xyBuilding`
- `pubRegulatoryAgreement/.../BuildSelectDialog.vue`：同上
- `repairFunds/finance/rec/index.vue`：固定「归集账号」文案，API 统一为 `listRec` + `listRecBankDetail`
- 已确认上述文件中无残留引用，且无 linter 报错

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：bf97360e-6cc0-4224-aef3-edf155a68b8e；验证证据：extracted source=cursor project=苏州市房地产监测V3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_env_branch_cleanup",
  "source_extraction_id": "23307535f6ae434f939ec78293727547",
  "version": 2,
  "memory_type": "entities"
}
-->