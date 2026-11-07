# 产品2.0 分支拓扑与改动落点规则
产品2.0 仓库并行维护多分支，改动落点由目标分支是否已存在该文案/功能决定，262-yulin 为实际在用环境分支。

## 分支现状
- 并行分支：develop/v2.6.1、develop/v2.6.2、develop/v2.6.2-yulin 等
- v2.6.2-yulin 是实际在用环境分支，v2.6.1/v2.6.2 为对外发布版本分支

## 改动落点规则
- 若 261 分支无该描述则不加，直接在 262-yulin 上修改
- 确认 262 分支也无该描述才能放行
- 若 261/262 已有该描述，则先在 262 改再合并到 262-yulin
- 动手前先 grep 目标文件在 261 与 262 上的实际内容确认是否存在
- 跨分支改动优先 cherry-pick，回报「分支 → 新提交 SHA → 状态」表格，推送前先问是否 push，不默认推远程

## 验证与归属
- 验证证据：会话 d67ed19e 用户明确分支口径；会话 e1ad93b0 用户要求修复 pick 到 2.6.1 和 2.6.2，产物为分支/提交对照表并询问推送
- 涉及文件：d:\repository\产品2.0、d:\repository\产品2.0\zhi2-web-admin
- 所属项目：产品2.0；来源会话：d67ed19e-3867-4b95-a599-b0a4a6101d66, e1ad93b0-6622-47db-907c-870e43850734；代码基线：075e6e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "product2_branch_landing",
  "source_extraction_id": "864f8e223f1e4bbc8b0262bd6bfcb62d",
  "version": 1,
  "memory_type": "entities"
}
-->