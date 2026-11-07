# 同列按行层级切换字典与开关渲染
苏住房G项目机构银行权限列表「启用状态」列需市级行显示字典文字、区级行显示可操作开关，同列按行运行时分流。

## 问题根因
- 列渲染形态是列级配置，列上写死type:'switch'或type:'dict'后整列只能同一种
- 切换分层后字典没转换：走switch分支的行不触发字典翻译，走dict分支的市级行拿不到options，两条链路各自漏一半
- 用户否掉「统一成开关」「统一成文字」两种偷懒做法

## 解决方案
- 该列从纯配置改成插槽/自定义渲染，渲染处先判当前行层级（市级/区级标志字段）
- 市级分支渲染dict文案（显式传options或dict-url，不指望组件按prop自动推字典）
- 区级分支渲染开关并绑状态变更事件，两分支共用同一份字典options来源
- 改完手动点「市级→区级→市级」验证切层后不残留上一种形态

## 验证与归属
- 验证：会话60af88ee用户依次反馈「启用状态显示不正确」→「点完市级再点区级还是显示成文字」→「市级字典、区级开关」→「市级字典没转换」
- 涉及文件：system/regionBankAuth/index.vue、system/regionBankAuth/detail.vue、mixins/listMixins.js
- 所属项目：苏住房G；代码基线：864b409；来源会话：60af88ee-274a-46dc-82a1-ad6da4012c53

## 关联区分
- 与已知「查看态误用开关控件」「有无类字段字典选型」区别：那两条是选错控件/字典，本条是同列按行运行时分流

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "status_col_rowlevel",
  "source_extraction_id": "d2b47756a3ff4649b774baa576cac35f",
  "version": 1,
  "memory_type": "entities"
}
-->