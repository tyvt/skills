# 日期范围disabledDate的anchor跨度逻辑
苏住房G的companyListQuery.js更新时间选择器共用边界/跨度逻辑驱动三处，校验失败分支必须重置anchor否则过期anchor收窄可选范围。
## 问题根因
- 全局上下界、anchor±2年跨度、validateUpdateTimeRange提交校验三者共用边界计算，本身为保证UI与提交一致。
- 坑在anchor生命周期：用户只点第一日期未完就关掉，校验失败仅报错不清空vm._updateTimePickAnchor，下次打开仍按过期anchor灰掉合法日期。
- 全量npm run eslint因仓库历史报错失败，不能用于单文件结论。
## 解决方案
- 把重置anchor作为校验失败必经动作，与成功提交后重置同源同一方法，保证disabledDate收窄仅存活于一次完整两次点击周期。
- 改动disabledDate时检查面板取消/关闭路径是否也走重置。
## 验证与归属
- 验证：会话6399869b评审结论仅MEDIUM，校验失败不清空anchor，建议失败分支同样重置。
- 涉及文件：src/utils/companyListQuery.js、src/views/company/companyRegister/index.vue
- 所属项目：苏住房G；来源会话：6399869b-5fa4-4c30-8a6f-e7e149d77c48；代码基线：3192070

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "datepicker_anchor_reset",
  "source_extraction_id": "53dcdef5796c422395b4454bfc7226df",
  "version": 1,
  "memory_type": "entities"
}
-->