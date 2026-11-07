# 区域分支 isSuzhouzhizai 移除规范
多个文件包含未统一的 isSuzhouzhizai/currentEnvironment 分支，已将其移除以整合通用公共逻辑。

## 问题根因
- exchangeContract/index.vue 和其他 5 个文件保留了 isSuzhouzhizai 和 currentEnvironment 分支，导致耦合
- notice/detail.vue、usemoney/detail.vue 以及另外 8 个文件（共 10 个）也保留了这些分支
- 多样性使得维护和标准化变得困难

## 已应用的解决方案
- 移除了特定区域的判断和列，固定为通用结构（例如：xyBuilding、listRec 接口、文本“监管项目”）
- 保留通用判断 isSupervisionBank
- 账户银行字段统一为 ${frontLabel}/${frontBank}
- usemoney 选项卡固定为 用款明细/关联楼幢/股东信息；RelatedBuildingsTable 在 useMoneyApplyType=='emphasis' 时显示使用计划列

## 受影响的文件
- 集合 1：exchangeContract/index.vue、contractView/index.vue、BranchOneDialog.vue、BuildSelectDialog.vue（benefit 两次）、rec/index.vue
- 集合 2：notice/detail.vue、usemoney/detail.vue、AppropriationBuildingsTable.vue、usemoneyRevoke/detail.vue、guarantee/components/RelatedBuildingsTable.vue、bond/components/BuildingTable.vue、plan/components/AppropriateTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：bf97360e-6cc0-4224-aef3-edf155a68b8e
- 验证证据: src=苏州市房地产监测V3-leftover/077.md 和 src=苏州市房地产监测V3-rest/127.md
- 所属项目: 苏州市房地产监测V3; 会话: bf97360e-6cc0-4224-aef3-edf155a68b8e, f81fe328-0c4a-411a-b2a9-b762808390a4
- 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_branch_remove",
  "source_extraction_id": "b54e474b6aa74ee0b9f522a7fb39bc63",
  "version": 2,
  "memory_type": "entities"
}
-->