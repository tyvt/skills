# Summary
2026-11-24，github.com-tyvt-skills 表示有了这个部署面板就不再需要 nginx UI 项目，可以移除。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 部署面板还有几个优化，1不要后端服务，如果是查sqlite，直接用wasm的cdn，纯前端，之前持仓面板做过类似的。2.每个项目都分成，本地，公司开发，公司测试，客户测试，生产，这5个环境，端口分开，看板上要展示这些，分别代理到不同的网关。3有这个面板我不需要nginx UI这个项目了，可以移除。4未收录是什么意思，部署了就放到面板里面，坏了就移除。

<!-- MEMORY_FIELDS
{
  "event_name": "nginx UI移除需求提出",
  "goal": "记录移除工具需求",
  "summary": "2026-11-24，github.com-tyvt-skills 表示有了这个部署面板就不再需要 nginx UI 项目，可以移除。",
  "ranges": "0",
  "source_extraction_id": "05c44fadf32a4b00bb008d75f7a71b8b",
  "version": 1,
  "memory_type": "events"
}
-->