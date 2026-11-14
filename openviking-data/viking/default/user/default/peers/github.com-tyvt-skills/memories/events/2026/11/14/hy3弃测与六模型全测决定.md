# Summary
用户确认 hy3 不测，保留 workbuddy/deepseek-v4.1-flash、workbuddy/glm-5.3-flash、workbuddy/glm-5.3、workbuddy/space-bunny、workbuddy/kimi-k3.1-pro、workbuddy/deepseek-v4-pro 共6个模型跑全部35题测试。助手据此对6模型重跑全量并采用双口径（名目分/有效分）评分。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: hy3不测，所以现在剩下的是dpv4.1flash,glm5.3flash,glm5.3,space-bunny,kimik3.1prop,dsv4pro对吧，这些模型跑所有测试
**assistant [peer=github.com-tyvt-skills]**: 确认保留名单（6 个）：`workbuddy/deepseek-v4.1-flash`、`workbuddy/glm-5.3-flash`、`workbuddy/glm-5.3`、`workbuddy/space-bunny`、`workbuddy/kimi-k3.1-pro`、`workbuddy/deepseek-v4-pro`。

跑**所有测试**（35 题：M1–M5 + T8–T11 + M6–M10）。其中 3 个已有旧 29 题数据（bench-full.json）、缺 M6–M10；3 个（glm-5.3/space-bunny/kimi-k3.1-pro）只有部分。最干净的做法：**6 模型 × 35 题全部重跑一遍**，结果单独存，口径统一、可复现，不与历史陈旧数据混淆。

复用刚才的 workbuddy 全量脚本，改模型名单 + 输出文件。先建 todo。

<!-- MEMORY_FIELDS
{
  "event_name": "hy3弃测与六模型全测决定",
  "goal": "确定评测模型名单",
  "summary": "用户确认 hy3 不测，保留 workbuddy/deepseek-v4.1-flash、workbuddy/glm-5.3-flash、workbuddy/glm-5.3、workbuddy/space-bunny、workbuddy/kimi-k3.1-pro、workbuddy/deepseek-v4-pro 共6个模型跑全部35题测试。助手据此对6模型重跑全量并采用双口径（名目分/有效分）评分。",
  "ranges": "44-45",
  "source_extraction_id": "2eb52604871c41f0ad5bf857ccd3a747",
  "version": 1,
  "memory_type": "events"
}
-->