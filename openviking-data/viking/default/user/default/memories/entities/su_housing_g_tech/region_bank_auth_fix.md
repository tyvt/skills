# 街道银行授权弹窗下拉数据源改造
苏住房G 中街道银行授权弹窗已按接口文档改造银行下拉数据源与保存逻辑。

## 改造内容
- 下拉数据源由 `/system/bank/list` + 父组件 `policy.districtAvailableBankIds` 过滤改为 `GET /streetBankPolicy/{subdistrictCode}/authorizedBanks`
- 弹窗打开并行请求详情（`GET /streetBankPolicy/{subdistrictCode}`）与可选银行（`authorizedBanks`）
- 已保存但区级授权失效的银行补进下拉并标「区级已失效」且 `disabled`
- 保存接口路径改为 `/streetBankPolicy/{subdistrictCode}`，首次不传 `rowVersion`，编辑带版本号，成功后用 `GET /streetBankPolicy/page` 刷新列表

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：请重新点「授权」验证下拉是否出现高新区已备案的银行
- 涉及文件：`zhi2-web-admin/src/views/system/regionBankAuth/index.vue`、`zhi2-web-admin/src/views/system/regionBankAuth/components/StreetAuthDialog.vue`、`zhi2-web-admin/src/views/system/regionBankAuth/utils.js`
- 所属项目：苏住房G；来源会话：dc798ac5-5460-4582-83cb-9f9c7bf0266f

## 弹窗样式修复（StreetAuthDialog.vue）
- 问题：多选银行名称时标签较长，在 520px 宽、标签区默认 max-width 下会挤占右侧，下拉箭头被挡住
- 弹窗宽度：520px → 720px
- 表单布局：label-position="top"，银行名称占满一行宽度
- 多选样式：标签区域 max-width: calc(100% - 40px) 为箭头预留空间；支持 flex-wrap 换行；输入框 min-height: 40px 随多行标签增高
- 高度仍由 MultiSelect 内的 resetInputHeight 处理，未再使用脆弱的 $children 调用
- 验证：行政区域银行授权中选街道节点 → 点「授权」→ 打开「新增银行授权」，确认多个长名称（含「区级已失效」）时箭头可见、可点开下拉
- 涉及文件：zhi2-web-admin/src/views/system/regionBankAuth/components/StreetAuthDialog.vue；来源会话：25f90065-5711-4fcc-a0ab-c949d750a651

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "region_bank_auth_fix",
  "source_extraction_id": "f2074fcee61d4e23857dd9d56f0de7d1",
  "version": 2,
  "memory_type": "entities"
}
-->