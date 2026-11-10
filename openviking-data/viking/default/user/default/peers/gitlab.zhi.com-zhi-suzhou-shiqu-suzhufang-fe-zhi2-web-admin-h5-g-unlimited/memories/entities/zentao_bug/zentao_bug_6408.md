# 禅道 Bug 6408
禅道缺陷 6408：首页双晒公示列表最后一列固定为完成率的问题修复。

## Description
- 模块：首页双晒公示（`zhi2-web-admin/src/views/home/v2/components/SunshinePanel.vue`）
- 现象：最后一列原先按维度在「进度 / 完成率」之间切换，禅道要求固定为完成率，进度条列未改

## Fix
- 末列固定为完成率，进度条列保持不变
- 分支：`develop/v2.6.2-suzhufang`
- 子模块提交 `c76626746`：`fix(home): 双晒公示列表末列固定为完成率 (#6408)`
- 父仓仅更新子模块指针 `000bb22`，未纳入 `env/.env` 等未跟踪文件

## Verification
- `npx eslint` 退出码 0，lint-staged 通过

## Status
- 代码已提交（截至 2026-11-10 会话）
- 未推送，未回写禅道

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "zentao_bug",
  "name": "zentao_bug_6408",
  "source_extraction_id": "a9bf597f2eab4415b256476bd0b3a8e0",
  "version": 1,
  "memory_type": "entities"
}
-->