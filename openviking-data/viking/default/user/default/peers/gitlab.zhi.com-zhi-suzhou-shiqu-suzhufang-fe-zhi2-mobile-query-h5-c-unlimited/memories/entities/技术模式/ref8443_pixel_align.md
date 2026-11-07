# ref8443像素对齐根因修复
苏住房C H5 ref8443 构建的像素级对齐根因修复（2026-11-06）。

## 像素对齐根因修复
- theme.css 泄漏：`.section-title` 需 `!important` 覆盖为 flex-start/44auto；`.choice{flex:1;height:32px}` 致选项块重叠
- uni-app H5 把全局 `input` 改写为 `uni-input`，Ref8443Range 用 JS 内联样式注入原生 `input[type=range]` 生效
- `uni-textarea` 外层 padding:12+min-height:90→114px，需 padding:0!important 并隐藏 compute/line/wrapper 限高90
- `.card.fields` gap 必须 14px（theme 默认12）；`label`/`field-block-label` line-height:21px 才高21
- submit 橙按钮缺 background，补 `.btn.orange{background:#fe9c2d!important}`；`.floating-rescue` 位置 bottom:72px right:18px

## 验证与归属
- 像素回归 6 场景此前已由 7%-41% 压到 5%-9.3%；本轮进一步：历史-汛前 6.78%→5.58%、历史-求援筛选 7.86%→6.67%，其余汛前检查 5.06%、汛中巡检 9.09%、求援工单 9.32%，新增汛后检查 8.61%（均 ≤9.3%）；剩余差异主因 uni-app 中文文字字形抗锯齿，delta=0 硬门难归零
- 所属项目：苏住房C（zhi2-mobile-shimin）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_pixel_align",
  "source_extraction_id": "e6976f4e59f24b80b343c3ab24a61785",
  "version": 1,
  "memory_type": "entities"
}
-->