# ref8443渲染模式
苏住房C H5 新增与8443参考站一致的 ref8443 渲染模式，配套像素比对E2E。

## 背景与目标
- 8443参考站作像素/样式基准，补齐H5演示数据与样式
- 像素级(100%)E2E校验渲染还原度

## 实现要点
- worktree分支实现 ref8443 渲染模式，与8443表现一致
- 像素比对E2E覆盖演示数据与样式；截图限 .app-shell/.ui-ref8443 规避uni-app壳层差异
- 结构E2E用 .tab-btn/文案选择器；布局几何对比E2E(±2px)作硬门禁
- 修复 theme.css .tabs{margin-bottom:10px} 泄漏使chips/card对齐top115.5/170

## 像素对齐根因修复(2026-11-06)
- theme.css泄漏：.section-title需!important覆盖flex-start/44auto；.choice{flex:1;height:32px}致重叠
- uni-app H5改input为uni-input，Ref8443Range用JS内联样式注入原生input[type=range]
- uni-textarea外层padding:12+min-height:90→114px，需padding:0!important并隐藏compute/line/wrapper限高90
- .card.fields gap必须14px；label/field-block-label line-height:21px
- 补 .btn.orange{background:#fe9c2d!important}；.floating-rescue bottom:72px right:18px

## 详情页「不存在」修复(2026-11-06)
- 根因：Ref8443History查看详情跳detail页，store.getRecord本地无demo id→请求真实后端404→弹「记录不存在」
- 8443详情页为静态页，本端对齐静态还原
- 新增Ref8443Detail.vue按kind分派，1:1还原汛中巡检/求援工单详情；detail/index.vue在isRef8443()下早返回跳过后端查询；补齐5张详情图与CSS

## 历史tab高亮缺失修复(2026-11-06)
- 根因：.tab-btn基础规则background:transparent!important压掉.active{background:#fff}缺!important
- 修复：.tab-btn.active/.chip-btn.active加!important；验证激活tab白底蓝字与8443一致

## 验证与归属
- 布局几何E2E门禁7/7通过；像素回归剩余差异6场景≤9.3%，主因uni-app中文字形抗锯齿
- 提交：e0d49d2(ff合dev)、b7a9549(详情+tab)、b2eec94(汛后表单)本地未推送
- 所属项目：苏住房C(zhi2-mobile-shimin)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ref8443_render_mode",
  "source_extraction_id": "cdc8d453ba5c40a0acca37469a40beb6",
  "version": 8,
  "memory_type": "entities"
}
-->