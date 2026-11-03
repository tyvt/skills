# B 端物业管理区域 SelectDialog extra 提示
园区物管2.0 中 B 端（terminalType === 'B'）区域选择弹窗通过 SelectDialog.open 的 extra 与 extraLinks 提示开户与签协议。

## 业务差异
- 复刻 assetLeaseApply 到 assetsLeaseContractFiling 等区域选择时，B 端增加 extra 文案说明仅可选已开户且已签署公共收益监管协议的物业管理区域
- extraLinks 提供「前往开户」「签署协议」跳转；非 B 端不传 extra，行为与原先一致

## 架构约定
- 与 SelectDialog.open 收口（#251/#284）配合：业务差异用 open 参数表达，不要各页再嵌一套弹窗模板

## 验证与归属
- 验证：会话 48461073 合同备案页区域弹窗按租赁申请页补齐 B 端 extra/extraLinks
- 涉及文件：zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/detail.vue、zhi2-web-admin/src/views/benefit/assetLeaseApply/detail.vue
- 所属项目：园区物管2.0；代码基线：7fe15a8cb；来源会话：48461073-b842-4049-8c74-3522cec9ab5b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_b_extra",
  "source_extraction_id": "1a80be442ad2431a98fa878c7d3779f0",
  "version": 1,
  "memory_type": "entities"
}
-->