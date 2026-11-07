# B/G分离企业管理员保持G端展示
苏住房G项目在B/G端分离改造中，企业管理员角色仍沿用G端展示与操作流程。

## 角色区分
- 企业管理员：isCompanyAdmin === true，行为与G端一致（G端菜单、不选管理区域、原有操作流程）
- 从业人员：terminalType === 'B' && !isCompanyAdmin，登录后先选物业管理区域，三资模块按所选区域隔离
- G端用户：terminalType !== 'B'，保持原逻辑

## 主要改动
- 新增 isCompanyAdmin 字段，在 getInfo 接口与 terminalType 同处获取并写入 store
- store 提交：commit("TERMINAL_TYPE", user.terminalType || null) 与 commit("SET_IS_COMPANY_ADMIN", user.isCompanyAdmin === true)
- 涉及文件：zhi2-web-admin/src/store/modules/user.js、getters.js、utils/projectContext.js

## 验证与归属
- 所属项目：苏住房G；来源会话：b5a23ac7-b66b-4ff9-8e21-ce2011adbf7d；代码基线：none
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bg_company_admin",
  "source_extraction_id": "abdd97970a8a4abf9d8be3872a649e61",
  "version": 1,
  "memory_type": "entities"
}
-->