# 自动生成禁止编辑字段遇历史空值会死锁须读originForm
苏住房G项目中用户管理新增「账号类型」自动生成而禁用编辑，但历史数据该字段为空，编辑时字段既禁用又必填导致整张表单无法保存。

## 问题背景
- 用户管理新增「账号类型」后因关联用户编码自动生成而设为「编辑态禁用」
- 历史数据该字段为空，编辑用户时字段既禁用又必填，整张表单无法保存
- 根因：禁用条件用当前表单值，必填校验是规则常量，两者对「空」判定不同源

## 解决方案
- 禁用判定改「仅当原始数据已有值才禁用」：编辑模式按 this.originForm.accountType 是否为空决定禁用，add 模式永不禁用
- 下拉选项分档：add 或「编辑且原始值为空」用可选项字典 sys_account_type，有值时切只读展示全集字典 sys_account_type_all
- 抽 isAccountTypeEmpty 同时判 null/undefined/空串/纯空格，避免「一个空格」绕过
- 关键顺序：detailCallback 里把 originForm 赋值移到所有表单字段处理完成之后，否则禁用门控先读到空 originForm

## 与已知差异及验证
- 比已知「accountType='4' 禁止编辑」更深一层：那条只讲取值，本条讲空值历史数据下的可编辑性门控
- 验证：用户报历史数据账号类型空致无法编辑保存；改为按 originForm 判空、选项按空切换字典、originForm 赋值后移
- 涉及文件：views/system/user/detail.vue、mixins/detailMixins.js
- 所属项目：苏住房G；来源会话：08df6a66-6dbe-4a03-8d68-a6fa9506abe6；代码基线：44d6576

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "autogen_field_deadlock",
  "source_extraction_id": "379120973bb24c27ab7081046431e71c",
  "version": 1,
  "memory_type": "entities"
}
-->