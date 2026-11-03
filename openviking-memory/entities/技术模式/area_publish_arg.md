# 区域报告 publish 接口额外参数陷阱
区域报告链路的 publish 接口可能带第二个参数（区域维度），只按文档或姊妹链路调用会缺参导致数据落错分区。

## 现象与根因
- 区域报告链路 areaReportPrepare：complex/page 取小区 → add → submit → approval → generate → publish → /areaReport 查询
- 源码里 areaReport 的 publish 有第二个参数（区域编码之类维度参数），普通报告 publish 没有
- 同一族业务路径相似（/v2.0/evaluation/...）但方法签名不一定对称，凭直觉调用必缺参

## 正确做法
- 调用 publish/generate/submit 等有副作用接口前，先读后端 controller 方法签名确认参数个数与类型
- 对照源码逐个列参数，区域版按 StdEvalReportPrepareController / 区域版 controller 签名传
- 主键字段名分清：编制 reportPrepareId、报告 reportId、区域编制同样 reportPrepareId
- 调用后必须回查列表/详情确认数据落在预期维度，不只看接口返回 200
- 签名差异记进 docs/std-evaluation/api-map.md 的「不符清单」供后续复用

## 验证与归属
- 来源会话 b1c0919f-1d59-4d84-b098-af6f3b182d48（基线 05caac8）用户诉求 2
- 涉及文件 e2e/std-evaluation/cases/06-report-prepare-flow.cjs、07-area-report-flow.cjs、docs/std-evaluation/api-map-report.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_publish_arg",
  "source_extraction_id": "421ba39906a5445fb5f38c4ff5cb2748",
  "version": 1,
  "memory_type": "entities"
}
-->