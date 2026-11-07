# ref8443填报日期输入框缩进修复
苏住房C H5 ref8443 填报页「填报日期」输入框灰框左缩进12px的CSS根因排查与修复（2026-11-06）。

## 问题根因
- 现象：填报日期输入框相对卡片内边距和下方counter右移、两边留白更大，用户误报为label有padding
- 根因：`<uni-input class="ref-input">` 外层被 `.ref-input{padding:12px}` 加12px内边距，内层`<input>`灰框从x=44、宽302开始（每边缩进12px）
- 参考站原生`<input>`灰框为x=32、宽326撑满卡片内容宽；两处label文字起点一致（ref 43 / mine 42，均因`* `前缀）

## 修复方案
- 将灰底+内边距从`uni-input`外层下沉到内层`.uni-input-input`，外层`padding:0`
- 使灰框撑满326、起点对齐32，与下方counter、卡片内边距完全左对齐（做法与之前textarea一致）

## 验证与归属
- 验证：inpX=32 inpW=326与参考站一致；汛前检查像素差5.06%→4.92%，其余页无回归
- 本地提交 `2541aa7 fix(ref8443): ref-input box fills full width...`（未推送）
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：2026-11-06消息0-32

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_input_align",
  "source_extraction_id": "931b1623d330438bb49e90cbcb416cc7",
  "version": 1,
  "memory_type": "entities"
}
-->