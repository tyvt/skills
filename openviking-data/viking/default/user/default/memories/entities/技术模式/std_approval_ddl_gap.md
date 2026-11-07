# 实体继承BaseApprovalDO但建表SQL漏列
StdEvalReportPrepare/StdEvalReport继承BaseApprovalDO带三列，但建表脚本漏建→报无效列名APPROVE_STATE。

## 现象与根因
- 报告编制接口报无效的列名[APPROVE_STATE]
- 实体继承BaseApprovalDO（带APPROVE_STATE/RECORD_USER/RECORD_TIME三列），但建表脚本V2.6.2-20261027-004.sql漏建这三列
- 区域维度那张表（areaReport对应表）是对的，说明是逐表手工写脚本的漏写而非设计如此
- StdEvalReportPrepare.complexIds缺@TableField(exist=false)导致MyBatis报Type handler was null（该字段transient不落库）

## 修复做法
- 补changelog：新增V2.6.2-20261031-001.sql，以ALTER补上缺失三列并应用到测试库（本次12条ALTER全成功）
- 实体非持久化字段一律加@TableField(exist=false)并补import（本次report/domain/StdEvalReportPrepare.java），与reportArea版本对齐
- 修完用mvn -pl zhi2-evaluation/zhi2-evaluation-server -am compile验证（exit 0）
- 同族表横向核对DDL一致性（普通维度vs区域维度、编制表vs报告表），漏列常只出现在其中几张

## 结果验证
- 修完POST /v2.0/evaluation/reportPrepare返回{"code":200,"data":...}且detail可查

## 验证与归属
- 来源会话 b1c0919f-1d59-4d84-b098-af6f3b182d48（基线05caac8）用户诉求3/4
- 涉及文件 zhi2-web-admin/src/views/evaluation/stdEvaluation/report/detail.vue、docs/std-evaluation/api-map-report.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_approval_ddl_gap",
  "source_extraction_id": "3de88f366cf7424d88a42c9766d22bcd",
  "version": 1,
  "memory_type": "entities"
}
-->