
# snapshot_openviking_data
OpenViking 全量质量 data 快照脚本，由 Windows 计划任务每日 03:00 调用，生成 vectordb 等质量数据镜像。

## 描述
- 拷贝 vectordb 前会短暂停 `openviking-server` 服务再拉起
- `mirrorVectordbRobocopy()` 使用 robocopy `/MIR`（= `/E` + `/PURGE`）严格镜像 vectordb，使备份树与源精确一致
- 安全守卫：purge 前比较源文件数与上次成功备份（`bySection.vectordb.files`），源少于 10 个文件或低于基准 50% 时自动退回 `/E /XO` 只复制不删除并输出 WARN
- 2026-11-09 提交 b53b2270 落地 /MIR + 守卫，并同步更新 openviking-data/README.md 说明镜像策略与守卫

## 推送与容错
- 脚本内置 push 重试 5 次 × 15s；遇持续跨境网络抖动会让 runner 中断、当天 memory 快照不执行（需手动补齐推送与补跑）
- 2026-11-09 真实跑曾因 GitHub 跨境连接 5 次 push 失败中断，后手动重试推送并补跑 memory 快照 bcfeffe3 成功

## 关系
- 被 `run-openviking-snapshots.ps1` 包装，作为每日计划任务顺序①执行
- 与 `snapshot-openviking-memory.mjs` 并列由计划任务每天 03:00 调用双快照


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "snapshot_openviking_data",
  "source_extraction_id": "f266dccd453d4f7d81a90cdf60055fe6",
  "version": 2,
  "memory_type": "entities"
}
-->