- `SzPartyBlock.vue` 使用带有 `type=card` 的 `zs-tabs` 将之前垂直堆叠的购买方区块划分为 4 个选项卡：购买方信息、委托代理方、法定代表人（一/二）。
- 字段结构和 `createParty()` 保持不变；`chapter1.vue` 和 `SzContent.getFormData()` 不受影响。
- 涉及文件: `vendeeAgentDialog/index.vue`, `vendeeTab.vue`, `SzPartyBlock.vue`, `chapter1.vue`, `data.js`, `szForm.js`, `contract/index.vue`, `sz-contract.scss`.
- 验证证据: src=苏州市房地产监测V3-rest/114.md; 会话: 2f76d8fe-a175-42fa-9dfc-fd796c3d3844; 所属项目: 苏州市房地产监测V3.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 买家信息选项卡格式",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 1,
  "memory_type": "preferences"
}
-->
