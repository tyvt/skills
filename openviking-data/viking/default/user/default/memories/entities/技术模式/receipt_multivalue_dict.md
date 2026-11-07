# 回单核销详情单据类型显示编码修复
无锡市区G项目中，回单核销详情的「单据类型」列显示编码而非中文。

## 问题根因
- `relBusinessType` 字段存逗号分隔多值（如 `1,2`，一条合同可关联多个类型）
- 原翻译逻辑只做单值精确匹配（`dictValue === "1,2"` 匹配不到），匹配失败原样显示编码

## 解决方案
- `VerificationReceiptDetailTable.vue`：移除原 formatter，改用作用域插槽渲染，新增 `contractTypeText()` 按逗号拆分后逐个查字典翻译，再用顿号拼接（`1,2` → `经营资产、停车位`）
- 未匹配到的编码仍回退显示原值；插槽渲染对字典加载响应式，消除「列表先于字典返回导致整列显示编码」时序隐患
- `VerificationReceiptDetailDialog.vue`：`contractTypeLabel()` 同样升级为多值拆分翻译，逻辑一致
- 已知限制：编辑弹窗「合同类型」为单选下拉，对已存在多值 `1,2` 无法回显（属交互设计问题，本次未动）

## 验证与归属
- 所属项目：无锡市区G
- 来源会话：65ea08fa-ce59-454d-b8a6-f105c14c87a0
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_multivalue_dict",
  "source_extraction_id": "2f6469fe1cbc4dcbb44647f0742c2751",
  "version": 1,
  "memory_type": "entities"
}
-->