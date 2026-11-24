# Summary
2026-11-24 排查探活返回空的问题：api.py 位于 dashboard 子目录，ROOT 取的是自身目录，导致 DB 指向不存在的 dashboard\registry.sqlite，已修正路径基准为仓库根并删除误建的空库。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 我的本地前端部署到数据库能做一个看板吗，现在很多项目的部署有问题，agent找不到正确的地址，或者反复改代理，有没有什么好办法
...
**assistant [peer=github.com-tyvt-skills]**: 探活内嵌 python 调用返回空。单独调试该命令找原因：
**assistant [peer=github.com-tyvt-skills]**: 找到根因：api.py 在 `dashboard\` 子目录，`ROOT` 取的是自身所在目录，DB 路径指到了 `dashboard\registry.sqlite`（不存在的新空库）。修正路径基准，并删掉误建的空库：

<!-- MEMORY_FIELDS
{
  "event_name": "看板API数据库路径错误修复",
  "goal": "修复数据库路径",
  "summary": "2026-11-24 排查探活返回空的问题：api.py 位于 dashboard 子目录，ROOT 取的是自身目录，导致 DB 指向不存在的 dashboard\\registry.sqlite，已修正路径基准为仓库根并删除误建的空库。",
  "ranges": "0,153-155",
  "source_extraction_id": "6cab2f90d651442bad5e9c6673c0b828",
  "version": 1,
  "memory_type": "events"
}
-->