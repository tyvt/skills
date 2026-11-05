# Summary
全局排查并修复同类Invalid end tag问题，因批量替换图片组件把`<img />`和`</ZsImage>`混写，修复7处文件并修正畸形静态路径。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】bug
【标题】全局修复类似错误
【内容】已全局排查并修复同类 **Invalid end tag** 问题，汇总如下。 ## 问题原因 批量替换图片组件时，把 `<img />` 和 `</ZsImage>` / `</ImageUploader>` 混写在一起，导致开始/结束标签不匹配。 ## 已修复文件（共 7 处） | 文件 | 修复方式 | |------|----------| | `pages_main/publicNotice/index.vue` | `<img /></ZsImage>` → `<ZsImage />` | | `pages_guard/index/index.vue` | 同上 | | `pages_owner/project/info/index.vue` | 同上 | | `pages_guard/emergencyContact/index.vue` | 同上 | | `pages_guard/guardApply/components/step1.vue` | 同上 | | `pages_owner/committee/application/index.vue` | 拆分为正确的 `<img />` + `</ImageUploader>` 结构 | ## 附带修复的畸形静态资源路径 同批替换还留下了错误路径（如 `..../../`、`../..../../../../`）
【验证证据】extracted source=cursor project=苏住房C
【涉及文件】`pages_main/publicNotice/index.vue ; `pages_guard/index/index.vue ; `pages_owner/project/info/index.vue ; `pages_guard/emergencyContact/index.vue
【所属项目】苏住房C
【来源会话ID】e6b2c88e-db79-4d03-ada4-c17e191d6830
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "img标签混写修复",
  "goal": "修复无效结束标签",
  "summary": "全局排查并修复同类Invalid end tag问题，因批量替换图片组件把`<img />`和`</ZsImage>`混写，修复7处文件并修正畸形静态路径。",
  "ranges": "0-5",
  "source_extraction_id": "9b70ab6d8b214640a33a8865f462425d",
  "version": 1,
  "memory_type": "events"
}
-->