# Summary
2026-11-06，苏住房C H5 ref8443 模式历史记录页 tab 高亮缺失问题修复完成。根因是 `.tab-btn` 基础规则 `background:transparent!important` 压过缺 `!important` 的 `.tab-btn.active{background:#fff}`，激活 tab 无白底；chip 同理。给 `.tab-btn.active`/`chip-btn.active` 加 `!important` 后，激活 tab 计算样式为 `background rgb(255,255,255)`+`color rgb(0,79,208)` 与 8443 一致，激活 chip 为 `rgb(0,79,208)` 蓝底白字。本地提交 b7a9549（未推送）。
# 2026-11-06 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 目前数据详情点进去都提示不存在无法查看，另外历史记录列表页tab高亮颜色缺失
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 两个问题分别排查：详情页提示不存在、历史记录 tab 高亮缺失。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Now the tab highlight issue. The ref `.tabs button.active` has `background:#fff; color:#004fd0`. Let me check what the ref-computed tab active vs mine is now. Earlier I fixed chip-btn active but maybe tab-btn active is missing background. Let me verify both issues in browser, and check current CSS for `.tab-btn.active`.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Tab active rule exists but not applying (bg transparent). Same problem: line 75 base `.tab-btn` sets `background:transparent!important`, and `.tab-btn.active` rule at line 86 has **no `!important`**, so base `!important` wins. Fix: add `!important` to active.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ...- 补齐 5 张详情图（6e68b/d7427/230fe/95178/248ae）与整段详情页 CSS。

## 2. 历史记录 tab 高亮缺失 ✅

**根因**：`.tab-btn` 基础规则用了 `background:transparent!important`，而 `.tab-btn.active` 的 `background:#fff` **没带 `!important`**，被基础规则压掉 → 激活 tab 无白底。chip 同理。

**修复**：给 `.tab-btn.active` / `chip-btn.active` 加 `!important`。验证 computed：
- 激活 tab：`background rgb(255,255,255)` + `color rgb(0,79,208)`（与 8443 一致）
- 激活 chip：`rgb(0,79,208)` 蓝底白字

## 附带效果

tab 高亮补齐让历史页像素进一步下降：
- 历史-汛前 6.78% → **5.58%**
- 历史-求援筛选 7.86% → **6.67%**

结构+布局 gate **7/7 通过**；5 个像素场景现均在 **5.06%–9.32%**。

## Git

`dev` 分支已本地提交 `b7a9549 fix(ref8443): static detail pages + tab active highlight`（未推送）。

需要我 **推送 `dev`**，或继续针对某页做字形级细修，告诉我即可。

<!-- MEMORY_FIELDS
{
  "event_name": "ref8443历史tab高亮修复",
  "goal": "修复tab高亮缺失",
  "summary": "2026-11-06，苏住房C H5 ref8443 模式历史记录页 tab 高亮缺失问题修复完成。根因是 `.tab-btn` 基础规则 `background:transparent!important` 压过缺 `!important` 的 `.tab-btn.active{background:#fff}`，激活 tab 无白底；chip 同理。给 `.tab-btn.active`/`chip-btn.active` 加 `!important` 后，激活 tab 计算样式为 `background rgb(255,255,255)`+`color rgb(0,79,208)` 与 8443 一致，激活 chip 为 `rgb(0,79,208)` 蓝底白字。本地提交 b7a9549（未推送）。",
  "ranges": "0-1,21-24,76-80",
  "source_extraction_id": "863a9fc1ad9b4ba49d2b09c5daca3e65",
  "version": 1,
  "memory_type": "events"
}
-->