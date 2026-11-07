# 提交报「该业务未配置流程」的三个坑
标准化评价提交接口返回未配置流程错误时，根因在环境缺配置与请求体少 deptId 字段。

## 根因
- 环境 ZHISHU_FLOWABLE.SYS_FLOW_CONFIG 缺 std_eval_* 记录（部署缺口），需先用幂等脚本补流程配置

## 关键坑位
- getInfoByBusCode 的 SQL 为 bus_code=? and dept_id=?，请求体必须带 deptId，只传 busCode 永远返回 null
- submit 的 SubmitInfoDto 必须带 deptId:1，否则照样报「该业务未配置流程」
- Flowable 流程查询按「业务类型+部门」双键匹配，少字段静默返回 null 致错误文案指错方向

## 修复与排查
- 用幂等脚本 e2e/std-evaluation/tools/setup-flow-config.cjs 补 9 个 busCode（deptId=1，procDefId=process_68xcwhhq:2:4b7371fc-42ef-11f1-b3bc-ce0221a0fd91「一审」）
- 用例不自建/不删 flowConfig，直接断言真实 0→1→2 流转
- 排查顺序：先看 SYS_FLOW_CONFIG 有无 busCode → 再看请求体有无 deptId → 最后怀疑环境
- 环境补齐 9 条 std_eval_* 配置后，「未配置流程」降级分支不再成立，应删除并改真实 0→1→2 流转断言，双轮复跑验证幂等（会话 00e04b09）
- 来源会话 d38c482b；代码基线 05caac8；涉及 e2e/std-evaluation 工具与库

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_config_pitfalls",
  "source_extraction_id": "1263221b66574e68adffd33a9aa6f611",
  "version": 2,
  "memory_type": "entities"
}
-->