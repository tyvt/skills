# 禅道缺陷 #6403
门户 AI 智能问答超过一屏后点击热点问题，问题和答案贴底导致问题被滚出可视区的缺陷。

## 现象
- 标题：门户 AI 智能问答超过一屏后再点热点，问题和答案会先贴底，问题被滚出可视区
- 环境：苏州房地产客测环境（新禅道库）

## 根因
- 文件 `HomeAiChatDialog.vue` 在发出问题和答案到达时都执行 `scrollTop = scrollHeight`
- 列表超过一屏后，新问题被顶到可视区上方，用户先看到底部，看不到完整问题

## 修复
- 消息行增加 `data-msg-id`
- 发出热点或输入后先把该问题行对齐到列表顶部；答案出现后仍对齐这条问题，不再贴底
- 问题本来就完整可见时不滚动
- 提交 `zhi2-web-admin` 分支 `develop/v2.6.2-portal`，commit `71853aca7`，已推送 `origin`

## 状态
- 父仓库 gitlink 未更新，禅道仍是 active（客测未验收）

<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6403",
  "source_extraction_id": "dfbc22ba0d81478cbefd1c843f84d5a9",
  "version": 1,
  "memory_type": "entities"
}
-->