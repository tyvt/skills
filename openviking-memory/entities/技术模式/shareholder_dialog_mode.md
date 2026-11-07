# 股东弹窗mode被详情混入覆盖视图失效
苏州市房地产监测V3 中 ShareholderDialog.vue 的 prop mode 被 detailMixins 的 computed mode（源于路由 formMode）覆盖，父组件传入 view/edit 无效。

## 问题根因
- ShareholderDialog.vue 的 prop mode 被 detailMixins 的 computed mode 覆盖
- 父组件传入 view/edit 无效，弹窗视图失效

## 修复方案
- prop 改名 dialogMode 并基于其控制标题与保存逻辑
- view 模式采用 DetailTemplate+contentInfo，仅显返回
- 增 data-testid="register-shareholder-dialog-view"

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/148.md
- 涉及文件：register/components/Step4Shareholders.vue、register/components/ShareholderDialog.vue、company/companyManagement/components/shareholderTable.vue、toB/shareholder/detail.vue、register/components/companyInfo.vue、register/companyRegister.vue、register/components/Step3Appendix.vue、mixins/detailMixins.js
- 所属项目：苏州市房地产监测V3；来源会话：bc548255-f57a-4017-8739-5446258f1073；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_dialog_mode",
  "source_extraction_id": "38960cc9508a40a19b9c3ec07e6c4353",
  "version": 1,
  "memory_type": "entities"
}
-->