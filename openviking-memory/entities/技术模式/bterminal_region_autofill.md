# B端物业区域禁用且自动填充当前选中
园区物管2.0 中 B 端页面通过 isBTerminal 计算属性禁用物业管理区域输入框、隐藏搜索图标，新增时自动填充当前选中区域。

## 实现要点
- 新增 isBTerminal 计算属性判断是否为 B 端
- 禁用物业管理区域输入框并隐藏搜索图标
- 新增时自动填充当前选中的物业管理区域

## 各页适配
- pubRegulatoryAccount 等页按各自接口填充区域
- pubRegulatoryStopAgreement 抽取 applyPropertyProjectRow 共用赋值逻辑

## 验证与归属
- 涉及文件：benefit/pubManagementOrg/detail.vue、benefit/pubBankReceiptApply/detail.vue、benefit/pubExpenditureContract/detail.vue、benefit/pubElevMaintenanceNew/detail.vue、benefit/pubRegulatoryAgreement/detail.vue、benefit/pubMerchantNumber/detail.vue、store/getters.js、store/modules/user.js
- 所属项目：园区物管2.0；来源会话：93317773-d26a-4a23-9229-5c568913c133；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_region_autofill",
  "source_extraction_id": "05b35db7c19f43dfbd35a50cdb6ad06c",
  "version": 1,
  "memory_type": "entities"
}
-->