# 禅道 biz 版 task edit 表单丢失式渲染
禅道 biz 版 task 的 pri/deadline/status 不在 f=edit 表单里，用 edit 补字段会把它们冲成空/0/NULL。

## 问题现象
- 对禅道任务 #2146 执行 start 动作因未传 assignedTo，指派人被清空
- 用 f=edit 表单补指派人时，pri/deadline/status 被冲成空/0/NULL（表单无这些控件）
- desc 本就为空、name 未受损；最终用 dbx_execute_batch 精准 UPDATE 复原

## 根因
- 禅道 f=edit 是表单渲染型接口：只渲染表单存在的控件，提交时只带这些控件，缺控件字段被当「没传」写成空值
- 与 REST 式 PATCH 语义完全不同，「用 edit 表单修一个字段」实际是「重写整条记录」

## 正确做法
- 绝不把 f=edit 当 PATCH 用，修单个字段走 DB 精准 UPDATE（dbx_execute_batch）或禅道专用接口
- 用 edit 前确认目标字段在表单里存在，不在就别用
- start 动作必须带 assignedTo，否则清空指派人
- 改完逐字段核对（status/pri/deadline/assignedTo/name/desc），与未受损记录基线对照
- 状态回写优先走标准动作接口（如 start）留 zt_action 审计记录

## 验证与归属
- 来源会话 session-4208fc64-80b9-409d-8aad-a50126748229（基线 c35a24a）RCA 结论
- #2146 恢复 doing/pri=2/deadline；#1976 补 tiany；audit started records present

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zentao_edit_loss",
  "source_extraction_id": "421ba39906a5445fb5f38c4ff5cb2748",
  "version": 1,
  "memory_type": "entities"
}
-->