# 新增可选与全量展示双字典切换
系统用户管理账号类型字典存在受限与全量两个编码，需用双字典+计算属性切换避免新增越权或历史码显原值。

## 根因
- 仅用 sys_account_type（新增/编辑可选受限集合）会导致查看历史数据时旧类型因不在受限字典而显示原始码。
- 仅用 sys_account_type_all（含历史/停用全量集合）会导致新增时能选到不该新增的类型。

## 解决方案
- data 放两个独立字段：accountTypeSelectOptions=sys_account_type、accountTypeAllOptions=sys_account_type_all；initDict 并行请求分别写入。
- computed accountTypeOptions 按 formMode 在两者间切换（新增/编辑用受限字典，查看/展示用全量字典），模板绑定不动。
- 该「双字典+formMode 计算属性切换」结构可复用于同类字段。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/system/user/detail.vue
- 所属项目：园区物管2.0；来源会话：01127c4b-5175-4404-8a7f-494fd82416c5；代码基线：040.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_dual_dict",
  "source_extraction_id": "7aa21506fd5c4a07951cf74c630599a1",
  "version": 1,
  "memory_type": "entities"
}
-->