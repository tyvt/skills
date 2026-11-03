# zs-table全列设宽右侧留白
园区物管2.0 中 zs-table 全列设 width/min-width 时右侧留白，需组件层改造让 min-width 弹性列参与剩余空间均分。

## 问题根因
- 列表页所有列都写了 width 或 min-width，右侧留白，表格撑不满容器
- zs-table 默认 fit:false，列宽由 zs-table-column 自行计算分配
- 原先只有「既无 width 也无 min-width」的列才参与剩余空间均分；设了 min-width 的列不参与分配，设固定 width 的列更不会，总宽小于容器就留白

## 解决方案
- 组件层改造：zs-table-column 新增 min-width 弹性列支持，仅设 min-width 未设 width 的列按内容计算宽度并参与剩余空间分配，分配结果不低于配置的 min-width
- 固定 width 列行为保持不变
- 页面侧把「银行账号 width=220」「交易时间 width=250」改成 min-width 即可撑满
- 约定：希望列既保底又参与均分时用 min-width 不写 width；min-width 去掉则完全走自动宽度

## 验证与归属
- 验证：改 zs-table-column.vue 增加 min-width 弹性列分支，pubBankAccountInfo/index.vue 固定 width 改 min-width
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/views/benefit/pubBankAccountInfo/index.vue
- 所属项目：园区物管2.0；代码基线：已知 zs-table 固定宽列参与均分(#486)、写死 width 致表头省略(#871)、拉伸列注册 uid 不一致(#724)，但「min-width 列不参与均分导致右侧留白」组件层改造未记录；来源会话：a13d9179-fa05-481f-b22b-445c139f6f77

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zstable_minwidth_elastic",
  "source_extraction_id": "21155a3ba2ee488fb8dc6fd1a92e34f7",
  "version": 1,
  "memory_type": "entities"
}
-->