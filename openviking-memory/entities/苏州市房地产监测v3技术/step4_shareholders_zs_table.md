# Step4股东信息采用zs-table标准布局
苏州市房地产监测V3注册流程的 Step4Shareholders.vue 改用 zs-table 标准布局替代 el-table。

## 布局变更
- Step4Shareholders.vue 采用 list-container 与 list-card 布局
- 将 el-table 替换为 zs-table，表头背景设为 #fafafa
- 行内操作改为 size="mini" 按钮

## 步骤指示器
- RegisterStepper/index.vue 步骤优先使用蓝色 currentIcon 替代绿色勾选

## 验证与归属
- register-helpers.js 扩展 assertRegisterStep4Ui 覆盖 UI 断言
- 验证证据：src=苏州市房地产监测V3-rest/041.md
- 涉及文件：Step4Shareholders.vue、Step4ServiceScheme.vue、RegisterStepper/index.vue、company-register-visual.spec.js、companyRegister.vue、register-helpers.js、company-register-branch.spec.js、Step3Appendix.vue
- 所属项目：苏州市房地产监测V3；来源会话：79fe0b81-4025-4dee-84bb-2b23de7ef2f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "step4_shareholders_zs_table",
  "source_extraction_id": "5433c232efe34458a8cf874c6e884567",
  "version": 1,
  "memory_type": "entities"
}
-->