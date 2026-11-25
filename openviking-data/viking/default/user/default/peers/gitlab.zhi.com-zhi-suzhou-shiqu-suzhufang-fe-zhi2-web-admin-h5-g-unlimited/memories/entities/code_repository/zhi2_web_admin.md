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

<!-- MEMORY_FIELDS
{
  "category": "code_repository",
  "name": "zhi2_web_admin",
  "source_extraction_id": "700205d96d9a42d49b5dc9d4de7ab6b5",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->