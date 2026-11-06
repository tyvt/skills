# 公共收益缴存子账户字典修复
园区公共收益 zhi2-web-admin 修复「公共收益缴存/新增选择结算账户」中「是否启用子账户」列显示为空的问题。

## 问题原因
- 全局 dictFormatter 按列 prop 查找 {prop}Options 字典
- hasSubAccount 列需要 hasSubAccountOptions，但页面仅加载了 yesOrNoOptions，导致该列显示为空

## 修改文件
- zhi2-web-admin/src/views/maintenance/depositNotice/components/detail.vue
- zhi2-web-admin/src/views/maintenance/depositNotice/company/components/detail.vue

## 主要改动
- data 中增加 hasSubAccountOptions: []
- initDict() 加载 sys_yes_no 时同步赋值给 hasSubAccountOptions

## 验证与归属
- 所属项目：园区公共收益；来源会话：7e4c18c0-5ce0-41ce-b4dd-d28988df5d00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_subaccount_fix",
  "source_extraction_id": "c7a49d90ffe84975b691194a3bab1e33",
  "version": 1,
  "memory_type": "entities"
}
-->