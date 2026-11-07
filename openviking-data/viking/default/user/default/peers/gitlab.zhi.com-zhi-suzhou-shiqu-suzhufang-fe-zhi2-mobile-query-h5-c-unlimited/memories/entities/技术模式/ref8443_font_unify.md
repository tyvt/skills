
# Ref8443Inspection字体统一修复
苏住房防汛C端查询H5（ref8443）修复汛前/汛中/汛后共用组件 Ref8443Inspection.vue 的选项主标签与「备注」字体不统一问题。

## Description
- 现象：选项主标签 choice-b（如「路基下沉、塌陷、空鼓、开裂」）与「备注」(field-block-label) 观感不一致，前者偏灰偏小。
- 真实根因：全局样式 src/styles/ref8443.css 中规则 `.ui-ref8443 .choice-label span { color:#737686!important; font-size:11px!important }` 本意只作用于「单选」小提示 choice-sub，但命中了 .choice-label 内所有 span（含 choice-b 内层 span），将其强制为 11px 灰色。
- 屏幕文字实际渲染在 uni-text 内部的 `<span>` 中；容器层 uni-text 计算样式虽为 14px/#191c1f，但内层 span 被上述全局规则覆盖。
- 早期（提交 8764149）曾清理 Ref8443Inspection.vue 的 scoped 冗余规则（含 .choice-b{font-family:'Noto Sans SC:Medium' 回退异常}、.choice-sub{10px 全局11px}、.mid-bold/.choice/.card-h3 重复覆盖），但未解决 span 层被全局规则覆盖的问题，用户反馈仍不统一。

## Solution
- 早期修复：删除 scoped 中 .card-h3/.mid-bold/.choice/.choice-b/.choice-sub 冗余规则，仅保留组件专属 .section-bar。
- 本次修复：收窄 `.choice-label span` 规则，仅作用于 `.choice-sub` 及其 span；新增 `.ui-ref8443 .choice-label .choice-b span { color:#191c1f!important; font-size:14px!important; font-weight:500!important }`，使选项主标签内层 span 与字段标签完全一致。
- 所有同级标签统一：choice-b/field-block-label = 14px/500/#191c1f；单选提示统一 11px 灰色。

## Verification
- 验证：测试环境 8095 实测，汛前/汛中/汛后 choice-b 内层 span 均为 14px/500/rgb(25,28,31)=#191c1f，与「备注」span 完全一致；「单选」提示保持 11px 灰色。
- 本次提交 095727a，合并 dev 为 9ed915f；独立 worktree 完成/合并/删除，dist 覆盖部署 nginx 8095。
- 早期提交 8764149 合并 dev 为 7288bed 已完成 scoped 冗余清理。
- 所属项目：苏住房防汛C端查询H5（zhi2-mobile-query-h5-c / ref8443）；会话时间：2026-11-06


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ref8443_font_unify",
  "source_extraction_id": "3cbaf8f9d39c4fdc98624f4fdd61855f",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->