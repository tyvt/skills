# 台账类接口 ID 主键优先级错配致 200 空数据
苏住房G统计地图/小区台账点物业管理区域 marker 打开抽屉，Network 全 200 但页面显示全 0 和「暂无数据」，根因是台账接口 ID 主键被改成 complexId 优先。

## 现象与根因
- 统计地图/小区台账点物业管理区域 marker 打开抽屉，XHR 全部 200，页面却显示全 0 和「暂无数据」
- DevTools 只截取 URL 最后一段显示请求名，两个「数字 ID」实为 selectOperatingAssetsCategory/{id} 和 selectOperatingAssetsCategoryHouseList/{id}，另两个 list 是地图层 selectOptionalComplexList，故「看起来 4 个 XHR」不等于漏调接口
- 某次提交把 resolvedProjectId 取值优先级改成 complexId 优先，而 standingBook 台账路径参数历来是 projectId || leaseProjectId
- 当 marker 上 complexId 与 leaseProjectId 不是同一值时，用复杂区 ID 查台账，后端按业务契约返回 200 + 空 data，前端渲染全 0

## 解法与边界
- 台账/合同类接口统一按 projectId → leaseProjectId → complexId 逐级兜底，complexId 只用于地图/GIS 维度（如运营报告 PDF 的 reportComplexId）
- 同一页面两套主键拆成两个变量（markerProjectId / reportComplexId），子组件按用途分别传 complex-id / project-id / lease-project-id，避免一个变量到处复用被优化时误改优先级
- loadPageData 补 skipFetch 判断，与 G 端详情页行为一致；地图抽屉与小区台账详情页两处入口都要对齐同一套传参
- 本条是「200 + 空 data」的 ID 语义错配（GIS 主键 vs 台账主键），与已知清单「跳转页 projectId 多来源互相覆盖」不同

## 验证与归属
- 会话 5aabb73b：用户「物业管理区域点进来帮看下是不是有接口没调，这是正式环境调的」；排查结论「接口已返回 200，但 data 为空」
- 根因 commit 5d50941f2 把 ID 优先级改成 complexId 优先；修复 resolvedProjectId 改回 projectId → leaseProjectId → complexId，overviewContent 拆分 markerProjectId 与 reportComplexId
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue、overviewContent.vue、index.vue、statisticsMapDetail/index.vue
- 所属项目：苏住房G；代码基线：3c282a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ledger_id_mismatch",
  "source_extraction_id": "76e464440c524a74abc39276f53511b5",
  "version": 1,
  "memory_type": "entities"
}
-->