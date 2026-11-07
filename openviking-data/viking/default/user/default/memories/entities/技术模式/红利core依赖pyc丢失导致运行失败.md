# 红利core依赖pyc丢失导致运行失败
投资推送项目中原先 core.py 依赖 __pycache__/core.cpython-310.pyc，该文件丢失后本地报告与推送无法跑通，已通过将红利数据层迁移到 dividend_data.py 解决。

## Description
- 所属项目：投资推送
- 故障现象：core.py 通过 import 落到 __pycache__/core.cpython-310.pyc，该 pyc 消失后本地报告/推送无法跑通
- 根因：core 依赖编译产物而非明文模块，编译缓存丢失即失效

## Solution
- 将红利数据层迁到明文模块 dividend_data.py
- core 只保留信号与报告格式，不再依赖编译产物
- 涉及文件：core.py、dividend_data.py、report.py、push.py

## Verification
- 会话结论确认原依赖 pyc 已不存在，红利数据层已迁移到 dividend_data.py
- 来源会话ID：15eaf5dc-a45b-4a40-a904-8d1a5eb1e146

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "红利core依赖pyc丢失导致运行失败",
  "source_extraction_id": "6fcf19e7f06e4af3ad225cbe9704a787",
  "version": 1,
  "memory_type": "entities"
}
-->