# 经营资源租赁合同街道社区编码格式化修复
园区公共收益项目为经营资源租赁合同新增页选择物业管理区域弹窗的街道、社区列增加格式化器，显示名称而非编码。

## 问题原因
- 选择物业管理区域弹窗接口返回 `subdistrict`、`community` 为区划编码（如 `320571053`）
- `resourcesLeaseContractFiling/detail.vue` 表格列未配置 `formatter`，直接显示编码

## 修复内容
- 为「街道」「社区」列增加 `subdistrictFormatter`、`communityFormatter`
- 格式化逻辑来自 `detailMixins` 引入的 `area.js` mixin，按编码映射名称
- 修改位置约 498:507 行

## 验证与归属
- 涉及文件：resourcesLeaseContractFiling/detail.vue、area.js、assetsLeaseContractFiling/index.vue
- 所属项目：园区公共收益；来源会话：6bb1b34b-eb24-4b0a-b69b-69e34156d925；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "lease_area_fmt",
  "source_extraction_id": "7b233f10022e4baea6cc408744781873",
  "version": 1,
  "memory_type": "entities"
}
-->