# 决策页onLoad兼容id与decisionId
泰兴小程序 decision/detail.vue 的 onLoad 兼容普通链接与二维码场景的取值逻辑。
## 问题根因
- 旧代码 `decisionId` 仅取 `query.decisionId` 且打印 `console.log`。
- 报错日志来自修复前版本。
## 解决方案
- 提交 `ddd8f82` 删除日志。
- `onLoad` 中 `decisionId.value` 改为 `options.id || query.id || query.decisionId || ''`。
## 验证与归属
- 验证证据：src=泰兴小程序/023.md
- 涉及文件：src/pages_owner/decision/detail.vue、src/utils/index.js、src/api/autonomy.js、src/pages_owner/elect/detail.vue
- 来源会话ID：10ca1b8a-479f-41d6-a345-fad281b362e9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_onload_compat",
  "source_extraction_id": "9c4d3fe21ae44bfc9aa3c9ccda14f397",
  "version": 1,
  "memory_type": "entities"
}
-->