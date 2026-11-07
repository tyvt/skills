# 删除临时目录可验证工作流
任务收尾删除分析禅道需求所建临时目录时，需先核对绝对路径与文件数，删后用 Test-Path 与 git status 证明未误伤仓库。

## 风险背景
- 删除路径由「相对路径 + 当前工作目录」拼出，算错会命中仓库同名目录带走仓库本体
- 本项目为多仓工作区（苏住房C / 苏住房G 子模块），误删代价更高
- 删完不验证会导致 git status 突现成片 deleted，难分是自身还是并行会话删除

## 执行步骤
- 执行前用 `Resolve-Path` 取绝对路径，确认落在仓库根之下（例：`D:\repository\扬州存量房\.tmp_zentao2123`）
- 删前列出内容核对文件数（例 6 个：zq_20048.sql、zt_20047.png、fetch_sql.py、probe_finish.py、finish_task.py、smoke_hj.js），不符则停
- 删后用 `Test-Path` 确认返回 False，并跑 `git status --porcelain` 确认输出为空，两条齐备才算删除完成且未误伤
- 临时文件从一开始放仓库内专用目录（如 `.tmp_zentao<任务号>`），整目录删而非逐个拼路径
- 收尾还需核对 `HEAD` 与 `origin/dev` 一致、工作区无未跟踪文件再宣告交付

## 验证与归属
- 验证证据：会话 8980f771 基线 21ed3aef，禅道任务 2123「你只做前端就行了，做好整理一下配置」
- 所属项目：扬州存量房
- 删除结论原文：「删临时文件最容易翻车的是路径算错把仓库本体带走；执行前核绝对路径、核文件数，删完用 git status 证明工作区没被误伤——删除也是交付，得能验」
- 来源会话ID：session-8980f771-1028-471d-a554-9a2c001dc364

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delete_temp_verify",
  "source_extraction_id": "6e39ea42c1d04631b8da064f5a1f0c98",
  "version": 1,
  "memory_type": "entities"
}
-->