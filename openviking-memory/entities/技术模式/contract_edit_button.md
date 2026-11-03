# 合同详情页新增修改按钮
原 src/pages-iHome/my/contractDetail.vue 无编辑入口，信息不可编辑。

## 实现要点
- 新增“修改”按钮（$t('per.edit')）
- 校验 leaseContractId 后 uni.navigateTo 至 /pages-rent/contractEdit
- contractEdit 页支持编辑租赁及承租人信息

## 验证与归属
- 涉及文件：src/pages-iHome/my/contractDetail.vue
- 来源会话：bdd38753-38c4-41b7-993d-61f3bc588407；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_edit_button",
  "source_extraction_id": "9a29e76e1db34dbc832f5a873f6c0d40",
  "version": 1,
  "memory_type": "entities"
}
-->