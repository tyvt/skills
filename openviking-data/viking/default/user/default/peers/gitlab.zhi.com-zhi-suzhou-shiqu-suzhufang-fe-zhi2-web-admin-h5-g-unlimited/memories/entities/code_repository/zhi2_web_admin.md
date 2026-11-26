# zhi2-web-admin
The Suzhufang (苏住房) front-end code repository, mounted as a git submodule inside a parent repository.
## Structure
- Submodule name `zhi2-web-admin`; the parent repo records it as a gitlink that must be bumped after each submodule commit is pushed.
- Active work branch: `develop/v2.6.2-suzhufang`.
## Conventions
- Lint must pass before committing, and only the target file is committed.
- Other developers' dirty files are preserved by rebasing with `--autostash`.
- `env/.env` is a dirty local file that must be stashed and never committed.
## Task 2903 Maintenance Migration
- `feature/task-2903-maintenance-from-yuanqu` is the dedicated branch for the park maintenance fund migration from Yuanqu; final tip `f3fbb7fb` includes migration commit `e0015f8a650f826c9811cc545bb550d2ea2d8e05` plus committed bigscreen dependencies.
- `develop/v2.6.2-suzhufang` no longer carries the migration; cleaned remote tip is `0536eb883` after a revert was rebased on top of teammates' commits without force-pushing.
- Parent repo `develop/v2.6.2-suzhufang` must pin cleaned submodule tip `0536eb883`, not the feature tip; a mistaken gitlink to `f3fbb7fb` was corrected by forward commit `b0557f9`.
- Unrelated `env/.env`, flood/screen dirty changes, `_review.json`, and temporary artifacts were preserved and left out of commits; the feature branch build passed with exit code 0.
- 2026-11-26 新建维护分支 `develop/v2.6.2-suzhufang-maintain`（子模块与父仓两端同名），基于含迁移和 bigscreen 补文件的 `f3fbb7fb`，子模块已推送、本地/远程 SHA 均为 `f3fbb7fb0`；父仓提交 `0226156` 仅更新 gitlink（`72307fa → f3fbb7f`）、SHA `02261568c`。该基线未含 suzhufang 后续 6899/6915 等 bugfix，后续合并时再解冲突；env/.env、防汛大屏 ScreenHeader.vue/particles.js 像素 WIP 等脏文件全部原样保留、未进任何提交。

<!-- MEMORY_FIELDS
{
  "category": "code_repository",
  "name": "zhi2_web_admin",
  "source_extraction_id": "b38572146b7e4be2a267745ae40722c1",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->