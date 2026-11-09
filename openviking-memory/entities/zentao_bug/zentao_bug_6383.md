# 禅道 Bug 6383

【苏州房地产客测环境】合同网签-现售合同签订-新增合同，房屋性质显示为数字。status=resolved/fixed，resolvedBy=tiany，2026-11-09。

## 根因
- 页面：zhi2-web-admin 现售「新增合同」弹窗 `src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue`（路由 /xsht/contractMainInfo/cash）
- 该列 `prop="purpose"` 实为**房屋用途**编码（001/033 等，来自 cyzt_lpgl_purpose）
- 但表头误写「房屋性质」，且 initDict 加载的是 `cyzt_lpgl_buildingProperty`（01-05）字典
- 字典值对不上 → dictFormatter 未命中 → 直接显示原始数字

## 修复
- 两处表头 `房屋性质` → `房屋用途`
- `getDicts('cyzt_lpgl_buildingProperty')` → `getDicts('cyzt_lpgl_purpose')`
- 与同款预售弹窗 `contractView/components/chooseHouseDialog.vue` 保持一致（该处早已注明 purpose=房屋用途）

## 归属
- 子模块提交 4aff03045（fix/bug-6383-house-property-number 合入 develop/v3.0.0）
- 父仓库 f545553 已推送 develop/v3.0.0
- 构建产物 contractMainInfo chunk 含 cyzt_lpgl_purpose、不含 buildingProperty

## 经验
- 合同模块弹窗里 `purpose` 字段一律是「房屋用途」(cyzt_lpgl_purpose)，「房屋性质」字段是 `houseProperty`(cyzt_lpgl_buildingProperty)，两者勿混用。
- 判断字典列显示数字：dictFormatter 按键名 `this[prop+'Options']` 取字典，键名须与 prop 对应，且字典值须与实际编码匹配。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->