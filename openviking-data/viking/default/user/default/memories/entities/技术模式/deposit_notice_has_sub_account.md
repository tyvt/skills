# 公共收益缴存结算账户是否启用子账户显示为空修复
园区公共收益 zhi2-web-admin 修复新增选择结算账户时 hasSubAccount 列显示为空。

## 问题原因
- 全局 dictFormatter 按列 prop 查找 {prop}Options 字典
- hasSubAccount 列需 hasSubAccountOptions，但页面只加载了 yesOrNoOptions

## 修改文件
- zhi2-web-admin/src/views/maintenance/depositNotice/components/detail.vue：data 增加 hasSubAccountOptions:[]，initDict() 加载 sys_yes_no 时同步赋值
- zhi2-web-admin/src/views/maintenance/depositNotice/company/components/detail.vue：同上修改

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：7e4c18c0-5ce0-41ce-b4dd-d28988df5d00；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_notice_has_sub_account",
  "source_extraction_id": "6fca0bfeff2a4ec9beac3ad9d9f2ba6e",
  "version": 1,
  "memory_type": "entities"
}
-->