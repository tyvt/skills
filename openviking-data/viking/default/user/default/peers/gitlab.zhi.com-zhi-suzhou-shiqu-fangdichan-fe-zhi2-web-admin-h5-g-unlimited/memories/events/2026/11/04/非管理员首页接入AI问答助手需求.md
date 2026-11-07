# Summary
2026-11-04，用户提出将非管理员对内首页（经纪机构/开发企业皮肤）中红色圈出部分替换为管理员首页已有的 AI 问答助手板块（HomeAiPanel + HomeAiChatDialog），并隐藏原有的快捷入口（HomeQuickLinks）。助手梳理现状：非管理员首页使用 HomeLayoutSidebar.vue，右侧栏结构为用户卡 + 快捷入口(HomeQuickLinks) + 公示公告；管理员首页已有 HomeAiPanel 与 HomeAiChatDialog。助手计划先建 worktree 再改代码。
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 非管理员的对内首页，把红色圈出来的部分替换成管理员首页的AI问答助手板块，原来的快捷入口隐藏
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 我先梳理一下现状：非管理员首页（经纪机构/开发企业皮肤）用的是 `HomeLayoutSidebar.vue`，右侧栏结构是 用户卡 + 快捷入口(HomeQuickLinks) + 公示公告；管理员首页已有现成的 `HomeAiPanel`（AI问答助手板块，见第二张截图）+ `HomeAiChatDialog`。任务就是把侧栏布局里的快捷入口换成 AI 面板并接上问答弹窗。

按规则先建 worktree 再改代码。

<!-- MEMORY_FIELDS
{
  "event_name": "非管理员首页接入AI问答助手需求",
  "goal": "记录首页改版需求",
  "summary": "2026-11-04，用户提出将非管理员对内首页（经纪机构/开发企业皮肤）中红色圈出部分替换为管理员首页已有的 AI 问答助手板块（HomeAiPanel + HomeAiChatDialog），并隐藏原有的快捷入口（HomeQuickLinks）。助手梳理现状：非管理员首页使用 HomeLayoutSidebar.vue，右侧栏结构为用户卡 + 快捷入口(HomeQuickLinks) + 公示公告；管理员首页已有 HomeAiPanel 与 HomeAiChatDialog。助手计划先建 worktree 再改代码。",
  "ranges": "0,66",
  "source_extraction_id": "7502d973561f43528b143b3155c6bca6",
  "version": 1,
  "memory_type": "events"
}
-->