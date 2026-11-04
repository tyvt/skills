# 管理员维护进详情应请求 /company/comp
苏州市房地产监测V3 中 companyAdmin/detail.vue 在管理员维护进入详情时的回退分支与退出变更模式方法调整。

## 改动要点
- 改动文件：`zhi2-web-admin/src/views/company/companyAdmin/detail.vue:667-714`（getDetail 回退分支 + exitChangeModeToRecordDetail 方法）
- ESLint 0 error
- 建议管理端环境实测「管理员维护 → 点姓名进详情」验证页面正常加载且不再弹「变更单不存在」

## 关联文件与注意
- 涉及 `ruoyi.js`、工作树已恢复（ruoyi.js 不在改动列表，为其他无关改动）
- 详情组件 `src/views/company/companyAdminChange/detail.vue` 及前端防御相关 `zhi2-web-admin/src/views/company/companyAdmin/detail.vue`

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：session_0168ce9587f4868b32fddd6465acc3e3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_detail_fallback",
  "source_extraction_id": "6b122800a3944e5ab589de37f06d7ee6",
  "version": 1,
  "memory_type": "entities"
}
-->