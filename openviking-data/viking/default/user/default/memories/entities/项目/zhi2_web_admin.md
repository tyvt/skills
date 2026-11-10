# zhi2-web-admin
房地产综合服务平台门户；`门户` 主仓库的 git 子模块，路径 `D:epository\门户\zhi2-web-admin`。

## 仓库上下文
- 父主仓库：`苏州市房地产监测V3`，本地路径 `D:epository\苏州市房地产监测V3\`
- 作为 git 子模块记录，gitlink SHA `77a7e6dee` 与 HEAD 一致（2026-11-09）
- 父仓库维护编号错误台账 `docs/frontend/common-errors.md`（`E-XXX` 条目，2026-11-09 新增 E-046）

## 工作流规则
- 文档修改必须在 worktree 副本中进行，禁止在主仓库修改，保持主工作树干净
- 子模块构建生成的 `version.json` 必须回退，保证 git 树干净
- suzhufang-li 分支实际 checkout 于 `bug5897` worktree（主检出为 detached HEAD）；改动需提交于 `bug5897` 后同步主检出并刷新父仓 gitlink（2026-11-10）

## 已知问题
- 子模块 `.git` 指针含中文路径会导致 git 误报 "modified content"（` m zhi2-web-admin`）；`.git` 文件实际为正确 UTF-8
- 主仓库中预存在的未跟踪产物及被修改的 `env/.env` 不属于 agent，必须保持不动
- 主仓库内的 `zhi2-web-admin` 子模块目录存在但为空且 `.git` 链接文件缺失（预存在的未初始化/损坏状态，非 agent 任务 worktree 所致；子模块 gitdir 含全部提交，可通过 `git submodule update` 恢复）（2026-11-09）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "b207853aafb6424bbe77c58d64034b87",
  "version": 5,
  "memory_type": "entities"
}
-->