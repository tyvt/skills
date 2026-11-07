# 产品2.0 zs-table底部合计条关闭
产品2.0 的 zs-table 同时存在表内小计行与表底「合计」条两套汇总，需手动关闭避免重复。

## 问题现象
- 业务页用 showMethod 渲染表内小计行后，表底合计条默认开启，同一数字出现两遍。
- 合计条来自公共表默认渲染分支，易被误认为样式问题而写 CSS 隐藏。

## 根因
- 表内小计（showMethod 返回小计行）与表底合计（should-render-bottom-summary 控制）是独立开关，不互斥。
- 开启小计不会自动关闭底部合计条。

## 解决方案
- 页面用 showMethod 输出小计行时，同步在 zs-table 加 :should-render-bottom-summary="false"，仅保留表内小计。
- 若仅需总数不需要行内小计，用 zs-pagination 纯总数形态（:show-pagination="false"），不手写 table-summary。

## 验证与归属
- 验证会话 199feb40：用户反馈表格标注问题，最终加 should-render-bottom-summary=false 保留小计。
- 涉及文件：zs-table.vue、benefit/pubParkingRate/index.vue、listMixins.js。
- 所属项目：产品2.0；代码基线：57109f9。

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术笔记",
  "name": "product2_bottom_sum",
  "source_extraction_id": "ebabd8f7ad774dafbc19579a0e860e5b",
  "version": 1,
  "memory_type": "entities"
}
-->