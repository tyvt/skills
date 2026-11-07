# 选择监管标准弹窗数据不显示修复
苏州市房地产监测V3 项目修复「选择监管标准」弹窗有数据但不显示的问题，根因为 MCP 调用缺少 session_key。

## 根因说明
- `tdai_recall` 调用报错 `Missing required argument: session_key`，导致弹窗表格无数据
- 各工具必填参数：`tdai_recall` 需 `query`+`session_key`；`tdai_capture` 需 `user_content`+`assistant_content`+`session_key`；`tdai_session_end` 需 `session_key`
- `session_key` 填当前仓库文件夹名，本项目为 `苏州市房地产监测V3`

## 验证与修复
- 用户已用该 key 验证 MCP 可正常调用
- 若仍连不上，运行 `D:epository	dai-memory-setup\start-gateway-background.bat`
- 涉及文件：`RegulatoryDialog.vue`（路径 `zhi2-web-admin/src/views/supervision/agreement/jgxm/components/RegulatoryDialog.vue`）

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源会话：003bc3d6-55d2-4909-bd30-0c1d02f0083d
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_standard_popup_fix",
  "source_extraction_id": "bea5b1d885d5493fa705dd0a513cf1a1",
  "version": 1,
  "memory_type": "entities"
}
-->