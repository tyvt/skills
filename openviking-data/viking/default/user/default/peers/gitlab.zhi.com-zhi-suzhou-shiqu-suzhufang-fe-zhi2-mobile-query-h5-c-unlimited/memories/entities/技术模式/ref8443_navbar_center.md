# ref8443自绘导航栏箭头与计数器居中修复
苏住房C H5 ref8443 自绘头部返回箭头偏低、counter加减按钮字符未居中的CSS修复（2026-11-06）。

## 问题背景
- 用户询问navbar是否为uni-app原生；实际为Ref8443Header.vue自绘`.app-header`（`navigationStyle`已custom），箭头错位是样式问题
- 两个问题：①返回箭头`‹`未垂直居中（偏低4px）；②counter`+/−`按钮字符未居中对齐

## 根因与修复
- 返回箭头：原`line-height:1`+`margin:8.5px 0 0`+`height:auto`靠基线硬凑，箭头文字y=11比参考站y=7低4px；改为`height:34px;line-height:34px;margin:0`再`translateY(-2px)`，与参考站逐值相同（backBox y=9、arrow y=7）
- counter按钮：原`uni-button`用`line-height:normal`致`−`/`+`字形在36px按钮里视觉偏上；改为`display:flex;align-items:center;justify-content:center;line-height:1`真正居中字形（上下留白4/3，参考站3/3，视觉一致）

## 验证与归属
- 验证：箭头与标题基线一致垂直居中；counter`−`/`+`水平垂直居中；汛前检查4.92%→4.74%，汛中9.09%→9.06%
- 本地提交 `bfc02e4 fix(ref8443): center back arrow and counter +/- glyphs`（未推送）
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：2026-11-06消息33-74

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_navbar_center",
  "source_extraction_id": "931b1623d330438bb49e90cbcb416cc7",
  "version": 1,
  "memory_type": "entities"
}
-->