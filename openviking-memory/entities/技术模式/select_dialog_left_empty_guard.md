# zs-select-dialog左右联动左空不得查右前置拦截
苏住房G的 zs-select-dialog 树+表（左银行/右网点）联动弹窗，左侧未授权为空时右侧仍查全部网点，须组件层统一拦截。

## 问题现象
- zs-select-dialog 左侧依赖区域授权的银行列表（queryStartBank），某区未授权时左侧空
- 右侧表格仍带「搜索」按钮和自动查询，网点接口 selectTJgBankBranchList 的 workBankId 可选，未选时整体省略（Vue2 undefined 被 JSON.stringify 丢），后端无过滤返全部
- 用户能在无授权银行下选任意网点保存成功，属数据合规缺陷

## 根因
- 右侧接口 workBankId 可选外键被省略，恰好是分页公共接口掩盖故障
- 左侧空时未前置拦截，靠后端过滤无效

## 解决方案
- 在 zs-select-dialog-func.vue 统一拦截不改业务页：①左侧空时不发右请求，表格提示「请先选择左侧」；②搜索按钮先判空 toast「请先选择××」并 return；③左侧变化清空右结果与已选
- 业务页（benefit/pubRegulatoryAccount 的 showBankDialog()）无需改动即生效

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：太仓区未授权银行时左空右点搜索仍调接口未带 workBankId 查全部；修复为左空不请求显提示，点搜索提示「请先选择银行」；业务页弹窗无需改
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、views/maintenance/accountOpen/components/OpenDetailDialog.vue、property/components/BranchOneDialog.vue、system/workBank/components/pubRegulatoryBranchDialog.vue
- 所属项目：苏住房G；来源会话：e54e19e2-5d01-4169-ace4-1cfb25836888；代码基线：acf0b7c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_left_empty_guard",
  "source_extraction_id": "04514741d2024b92a72103d8b2d8e96e",
  "version": 1,
  "memory_type": "entities"
}
-->