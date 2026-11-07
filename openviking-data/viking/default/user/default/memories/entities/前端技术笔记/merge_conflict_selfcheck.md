# 合并冲突双重自检工作流
园区物管2.0 子模块 zhi2-web-admin 中处理报告的大量合并冲突前，需先双重自检确认是否真有冲突。

## 现象
- 用户带「还有 789 处合并冲突」结论求助，但实际子模块内 git diff --name-only --diff-filter=U 为 0、全仓 grep <<<<<<< 也为 0。
- 冲突可能已在别会话/分支解决，或工具面板统计的与 main 整体 diff 被误当冲突，或编辑器未保存缓冲保留旧状态。

## 做法
- 动手解冲突前双重自检：git status 看 UU 文件列表 + rg "<<<<<<<" . --glob '!node_modules' 看残留标记，两者都为 0 就不能再「解冲突」。
- 确认需重复合并 develop/v2.5.4 时按既定策略批处理：有 ours 改动的条目 git checkout --ours（保留 v2.6.0 的 zs-input、dialogMixins），仅 theirs 新增文件用 --theirs。
- 对 money.js、AmountInput/index.vue、main.js（主题色+formMode）、vite.config.js、ListTemplate.js 逐文件手工合并，最后 add -A 提交。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/AmountInput/index.vue、zhi2-web-admin/src/main.js、zhi2-web-admin/package.json、zhi2-web-admin/utils/money.js。
- 所属项目：园区物管2.0；来源会话：564b94a9-fe0a-429d-a4fe-0ce4c7447c7b；代码基线：无既有条目覆盖本条排查结论。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "merge_conflict_selfcheck",
  "source_extraction_id": "9147c18620be4462a8dc49a228e2758c",
  "version": 1,
  "memory_type": "entities"
}
-->