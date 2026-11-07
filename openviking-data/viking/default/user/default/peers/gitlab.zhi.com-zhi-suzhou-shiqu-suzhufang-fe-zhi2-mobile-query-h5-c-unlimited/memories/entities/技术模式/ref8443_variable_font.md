# ref8443可变字体字重陷阱
在 zhi2-mobile-query-h5-c（ref8443，苏住房防汛C端查询H5）项目中，参考站标题用 `font-family:"Noto Sans SC:Bold"` 配合 `font-weight:400`，本端用同字体配合 `font-weight:700`，导致标题明显偏粗。

## Description
- 项目嵌入的是可变字体（Variable Font `NotoSansSC-VF`），同一 woff2 文件按 Regular/Medium/Bold 三个别名注册并支持变重。
- 真正的字形粗细由 `font-weight` 数值决定，而非 font-family 别名。
- 参考站 `font-family:Bold + font-weight:400` → 可变字体按 400 常规渲染；本端 `font-family:Bold + font-weight:700` → 按 700 渲染，明显偏粗。

## Solution
- 详情页 `.summary h2`：`font-weight:700 → 400`
- 详情页 `.detail-section-title`：加 `font-weight:400`
- `.detail-card h3` 已是 Medium/500（与参考站一致），不动
- 提示：其他设了 `font-weight:700` 的 ref8443 标题（如填报页 `.section-title`）可能也有同样问题，需排查统一。

## Verification
- 验证：标题「永林新村 · 台风暴雨橙色预警防倒灌巡检」、「汛中巡查核验项目明细」现为常规字重，与参考站一致。
- 所属项目：苏住房防汛C端查询H5（zhi2-mobile-query-h5-c / ref8443）
- 来源会话：2026-11-06 对话；Git 提交 `5d8e00f fix(ref8443): detail h2/section-title font-weight 400`（未推送）

## 后续修正（2026-11-06 后续排查）
- 后续排查发现：参考站8443的字体实际并未加载（theme.css 指向 figma CDN 本机不通），参考站渲染的是系统字体；本端此前因 .ui-ref8443{font-synthesis:none} 禁止合成加粗，系统字体下选项/标题无法加粗。
- 修复：移除本地 @font-face 与 font-synthesis:none（commit 24e8e19），使本端与参考站共用 theme.css 字体声明，渲染一致。
- 原「可变字体字重」分析仅适用于字体成功加载的场景；本机实际两站均回退系统字体，标题差异主因是 font-synthesis 而非 font-weight 数值。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ref8443_variable_font",
  "source_extraction_id": "085f3069ca0e47daa099f5e61def2479",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->