# complexChange 楼幢范围表格合计恒为0
园区物管2.0 的 complexChange 楼幢范围表格（rangeTable.vue）底部「合计」的「单元数」「房屋套数」恒显示 0，而表格内「小计」行正常。禅道 bug #5765。

## 根因
- 合计只读分页接口 /property/complexChangeRange/page 返回的 summary，但该接口根本不返回 summary 字段。
- 组件内 summary 默认值写死为 0，展开 {...undefined} 得到 {} 不会覆盖默认值，合计恒等于默认的 0。
- 「小计」是前端对当前页数据累加、不依赖接口，故两行数字口径不同是判断根因的关键线索。

## 解决方案
- 合计改成两级来源：分页接口 summary 优先，缺失时回退变更单详情接口 /property/complexChange/{id} 返回的 totalUnit / totalHouse。
- 组件内 summary 默认值由 0 改成 undefined，避免无数据时伪造 0（0 是合法业务值）。
- 凡「小计前端算、合计来自接口 summary」的表，逐个核对分页接口是否真返回 summary，不能因路径带 page 就假设带统计。
- 回退接口按「表头所属单据」选（变更单详情），不退到不相干统计接口。

## 验证与归属
- 验证：会话 10c9e5a2（基线 8cd518d），禅道 bug #5765；修复改动 rangeTable.vue、detail.vue，提交 05fc4facf（develop/v2.6.1）。
- 涉及文件：zhi2-web-admin/src/views/property/complexChange/components/rangeTable.vue、zhi2-web-admin/src/views/property/complexChange/detail.vue。
- 来源会话：10c9e5a2-a290-4d2f-903a-f6b3dabeb01a；代码基线：8cd518d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complexchange_summary_zero",
  "source_extraction_id": "59460bd227de48aaac7eed677d51a6cc",
  "version": 1,
  "memory_type": "entities"
}
-->