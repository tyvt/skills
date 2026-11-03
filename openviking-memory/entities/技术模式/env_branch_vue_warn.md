# 环境专属分支未清理致组件Vue warn告警
苏州市房地产监测V3的 refund/detail.vue 等组件依赖环境专属分支触发 Vue warn，通过清理全局 mixin 与组件环境逻辑修复。

## 问题根因
- refund/detail.vue 等组件依赖 isSuzhouzhizai 与 currentEnvironment 环境专属分支
- 触发 vue.js:5108 Vue warn

## 修复方案
- main.js 删除全局 mixin 中的 isSuzhouzhizai computed
- refund/detail.vue 移除监湖及苏州智在逻辑，统一为缴款通知书号+楼幢号+「归集账户」
- 清理 50+ 文件环境分支

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/042.md
- 涉及文件：refund/detail.vue、exchangeContract/detail.vue、detailMixins.js、form.js、area.js、vite.config.js、main.js、app.js
- 所属项目：苏州市房地产监测V3；来源会话：ac832c35-75b7-4b62-81d0-dc57db9325d0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "env_branch_vue_warn",
  "source_extraction_id": "5433c232efe34458a8cf874c6e884567",
  "version": 1,
  "memory_type": "entities"
}
-->