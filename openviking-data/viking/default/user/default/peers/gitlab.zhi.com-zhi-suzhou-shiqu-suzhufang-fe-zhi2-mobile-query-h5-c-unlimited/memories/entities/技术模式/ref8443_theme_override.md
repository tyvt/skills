# ref8443主题样式覆盖修复
苏住房防汛C端 H5 ref8443 页面修复 theme.css 泄漏导致的样式错位，2026-11-06。

## 已修根因
- theme.css 泄漏：.action-bar 固定72px → ref8443.css !important 压回60px
- 全局 uni-button reset 挤乱 .toggle-row → 收窄 reset 并单独 flex 规则
- theme.css .choice{flex:1;height:32px} 重叠 → .ui-ref8443 .choice 全量覆盖

## Git与构建
- 分支 dev 直接本地提交（未推送），commit 4856264「fix(ref8443): theme overrides, native range, rescue/history parity」
- 选项标签样式对齐 commit b661b37「fix(ref8443): choice-label bold 700/#191c1f, choice-sub 11px (post+mid)」

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_theme_override",
  "source_extraction_id": "88ae84c0b79f44a4bf63ac09d0173b11",
  "version": 1,
  "memory_type": "entities"
}
-->