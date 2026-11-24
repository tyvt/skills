# dev_wuxi-sfb

Git submodule branch of the Wuxi shimin H5 benefit front-end that carries the `src/utils/portal.js` module.

## Description
- Submodule lives inside a parent repository whose gitlink points at this branch.
- Working tree is on `dev_wuxi-sfb`; the ESLint binary is installed inside the submodule rather than the parent.

## Conventions
- Commit messages follow `type(scope): 中文描述`, e.g. `fix(portal): 灵犀绑定选屋后首页房屋标题不再被占位文案覆盖`.
- Only intended source files are staged; `_review.json` stays untracked and temporary verification artifacts such as `mergefix_home.png` are deleted after use.

## Known Issues
- Two preexisting ESLint `operator-linebreak` errors at lines 332 and 478, byte-identical to HEAD and outside the recent 207–226 change range, so they are left unfixed rather than touched with `--fix`.

## Notable Activity
- 2026-11-24: commit `b95e5d5` (+17/−9 in `src/utils/portal.js`, fix preventing the home-page house title from being overwritten by placeholder copy after Lingxi house selection) was pushed to `origin/dev_wuxi-sfb`; remote SHA matched local HEAD and ahead/behind were both 0.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited",
  "category": "code_repository",
  "name": "dev_wuxi-sfb",
  "source_extraction_id": "c9f74b394f004cd0a91a86c508e4a5e5",
  "version": 1,
  "memory_type": "entities"
}
-->