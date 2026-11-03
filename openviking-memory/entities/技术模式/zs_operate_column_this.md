# zs-operate-column方法引用丢失this导致置灰失效
在buttons配置里传实例方法引用（如disabled: this.disableButton）时，组件回调this不指向Vue实例，bizState判断恒失效。

## 问题根因
- buttons配置写disabled: this.disableButton等实例方法引用，回调执行时this丢失
- bizState等状态判断恒失效，表现为批量禁用但单行删除仍可点

## 解决方案
- 抽取计算属性canOperate统一口径：bizState == 0 || bizState == '0'（待提交）
- 批量删除、勾选列、行内编辑与单行按钮共用canOperate
- 操作列动态项用箭头函数绑定上下文：disabled: () => !this.canOperate、visible: () => this.canOperate

## 验证与归属
- 验证：非待提交态单行删除应置灰或隐藏；待提交态批量删除需先勾选行
- 涉及文件：src/views/benefit/assetLeaseApply/components/houseTable.vue、src/components/zs-operate-column/zs-operate-column.vue、src/mixins/subTableMixins.js
- 所属项目：园区公共收益；来源会话：f1d10e9a-1ce1-4000-b675-9ed44669437d；代码基线：4468dfa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_column_this",
  "source_extraction_id": "2c504ba9bfd644fe8073772a4088d137",
  "version": 1,
  "memory_type": "entities"
}
-->