# 全局移除苏州智在与环境分支逻辑
苏州市房地产监测V3 中已全局移除 `isSuzhouzhizai` 和 `currentEnvironment` 相关逻辑，统一为通用逻辑。

## 核心变更
- `main.js`：删除全局 mixin 中的 `isSuzhouzhizai` computed
- `refund/detail.vue`（原报错页面）：移除监湖逻辑（人工记账、`currentEnvironment` 分支）与苏州智在逻辑（监管项目、公安/施工楼幢号），统一为缴款通知书号 + 楼幢号 +「归集账户」

## 清理范围
- 共涉及 50+ 个文件，覆盖 supervision（deposit / unblock / agreement / progress / bank）、commercialHousingSales、projectManagement、benefit / repairFunds
- 公共组件 `RegulatoryAccountDialog.vue` 同步清理
- 统一规则：删除环境专属分支，保留通用逻辑（`!isSuzhouzhizai` / 非监湖）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`main.js`、`refund/detail.vue`、`RegulatoryAccountDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话：ac832c35-75b7-4b62-81d0-dc57db9325d0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhouzhizai_env_removal",
  "source_extraction_id": "3fa26587d60f4b14a861e10b9d4f9839",
  "version": 1,
  "memory_type": "entities"
}
-->