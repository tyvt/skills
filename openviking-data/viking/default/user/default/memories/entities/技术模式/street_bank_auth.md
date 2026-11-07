# 街道银行授权下拉数据源改造
街道银行授权弹窗下拉选项须来自上级区有效授权接口，失效历史值补回下拉并disabled，保存走{subdistrictCode}+rowVersion。

## 问题根因
- 旧实现用/system/bank/list全量银行+父组件districtAvailableBankIds前端过滤，属「前端猜口径」易不同步
- 已保存街道授权可能残留区级失效银行，直接按新接口渲染会显示空白像丢数据

## 解决方案
- 下拉源换GET /streetBankPolicy/{subdistrictCode}/authorizedBanks，删前端bankIds过滤
- 弹窗打开并行请求详情（bankIds+rowVersion）与可选银行，本地合并
- 详情有下拉无的银行补进选项标「区级已失效」并disabled
- 保存统一/streetBankPolicy/{subdistrictCode}，首次不传rowVersion，编辑带版本号乐观锁
- 保存后GET /streetBankPolicy/page刷新列表；街道编码须从树/上级节点解析，勿从行对象想当然取

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话dc798ac5用户给接口文档并反馈subdistrictCode为空，最终改下拉源与并行请求等
- 涉及文件：system/regionBankAuth/index.vue、StreetAuthDialog.vue、utils.js、property/complex/components/RegionTreeLayout.vue
- 所属项目：苏住房G；来源会话：dc798ac5-5460-4582-83cb-9f9c7bf0266f；代码基线：92ce738

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_bank_auth",
  "source_extraction_id": "e32fbf3f2ec94e2394584ddc813a6f8f",
  "version": 1,
  "memory_type": "entities"
}
-->