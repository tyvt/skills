# 租赁详情子表移出表单修复取消按钮禁用
园区公共收益项目将资源租赁合同详情页的三个子表组件移出 `zs-form` 以解决弹窗取消按钮被禁用问题。

## 问题原因
- `resourcesLeaseContractFiling/detail.vue` 中 `subAdvertiseTable` 及 `subAdvertiseDialog` 放在详情页 `zs-form` 内
- 查看模式下表单 `disabled`，Element UI 的 `el-button` 通过 inject 继承该状态，导致弹窗内「取消」按钮也被禁用

## 修复内容
- 将广告位、公共场地、其他租赁三个子表组件移到 `zs-form` 外
- 结构与 `assetLeaseApply/detail.vue` 保持一致
- 代码位置约 213:216 行，`</zs-form>` 后渲染子表组件

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：resourcesLeaseContractFiling/detail.vue、assetLeaseApply/detail.vue、subAdvertiseDialog.vue、zs-dialog.vue
- 所属项目：园区公共收益；来源会话：8b780ae8-507b-43c5-a453-8d14ffb784a3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "subtable_form_fix",
  "source_extraction_id": "7b233f10022e4baea6cc408744781873",
  "version": 1,
  "memory_type": "entities"
}
-->