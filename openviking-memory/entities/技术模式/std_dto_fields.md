# 提交与审批DTO主键字段差异及busCode来源（std-evaluation）
提交接口用SubmitInfoDto.id、审批接口用ApprovalInfoDto.dataId，两者字段名不同且busCode/key仅在前端拼装，后端仓库无硬编码。

## 问题现象
- 调提交接口报主键为空（1105类），因提交用id、审批用dataId混用
- busCode与key在后端仓库内搜不到，只查后端会误判「字段不可能有值」

## 根因
- 同一提交流程拆两套DTO是Flowable通用封装历史设计，字段名不一致但接口路径相同（/{module}/{business}/submit|approval）
- busCode/key由页面运行时拼出（flowApi.buildBusinessApi与route.meta.submitApi兜底），后端自然无硬编码

## 排查与做法
- 分清两套DTO：提交 {id, deptId, busCode, key, ...}，审批 {dataId, busCode, key, approveResults, approveMessage}
- busCode/key找不到时去前端 zhi2-web-admin/src/api/evaluation/*.js 与 views，或读 src/utils/flowApi.js 的 buildBusinessApi
- 本页面传 moduleName:'evaluation'、businessName:'rectification' → 实际路径 POST /v2.0/evaluation/rectification/submit 与 /approval
- 报错先确认提交还是审批接口再对字段名；字段映射写进E2E公共库避免重踩

## 验证与归属
- 来源会话 d38c482b（基线05caac8）用户诉求2、4
- 涉及文件 e2e/std-evaluation/lib/std-eval-lib.cjs、zhi2-web-admin/src/utils/flowApi.js、zhi2-web-admin/src/views/evaluation/stdEvaluation/rectification/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_dto_fields",
  "source_extraction_id": "3e2e7f4e118548deb96ba4904d71db2b",
  "version": 1,
  "memory_type": "entities"
}
-->