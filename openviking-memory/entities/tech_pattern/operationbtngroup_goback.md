# OperationBtnGroup 返回逻辑误退新增页
OperationBtnGroup 的返回使用 $router.go(-1)，在新增保存跳详情后历史栈为列表→新增→详情，致退回新增页而非列表。

## 问题现象
- 新增保存跳详情后历史栈为 列表→新增→详情
- OperationBtnGroup 返回使用 $router.go(-1) 退回到新增页而非列表页

## 解决方案
- 修改 index.vue 返回逻辑对齐全局 goBack
- 去除路径末段回父路径

## 验证与来源
- 验证证据：src=产品2.0/068.md
- 涉及文件：zhi2-web-admin/src/mixins/form.js、src/views/system/user/detail.vue、src/mixins/formComponents.js、src/mixins/detailMixins.js、src/main.js、src/components/OperationBtnGroup/index.vue
- 所属项目：产品2.0；来源会话：65432183-de0d-46d6-bd78-1b5f9fc846c8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "operationbtngroup_goback",
  "source_extraction_id": "fa9fbf6cda8447e593386f0779b08270",
  "version": 1,
  "memory_type": "entities"
}
-->