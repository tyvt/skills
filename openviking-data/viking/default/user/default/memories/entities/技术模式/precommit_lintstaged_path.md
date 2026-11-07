# pre-commit调用lint-staged路径解析
在 zhi2-web-admin 所在的 monorepo（npm workspaces）中，husky pre-commit 调用 lint-staged 易因路径解析失败报 `MODULE_NOT_FOUND`。

## 现象
- pre-commit 执行报错 `MODULE_NOT_FOUND`，找不到 lint-staged

## 根因
- 产品2.0 父仓为 npm workspaces 时，在子目录 zhi2-web-admin 内执行 `npx lint-staged` 会解析成错误路径 `…/node_modules/node_modules/lint-staged`，导致 husky pre-commit 报 MODULE_NOT_FOUND。
- 另有旧场景：`.husky/pre-commit` 写死调用仓库根目录 `node_modules/lint-staged`，但包实际位于子应用 `node_modules` 也会引发同类报错。

## 解决方案
- 应在 hook 里先 `cd zhi2-web-admin`，再用 `node "$REPO_ROOT/node_modules/lint-staged/bin/lint-staged.js"` 直接执行根目录已安装的 lint-staged，完全绕开 npx 的 monorepo 路径解析。
- 旧场景已实现修复：更新 `zhi2-web-admin/.husky/pre-commit`，先尝试 `zhi2-web-admin/node_modules/lint-staged`，若无再尝试根目录 `node_modules`，两处皆无则明确提示并退出；当前在 `zhi2-web-admin` 下执行该 hook 已通过。

## 关联信息
- 验证证据（npm workspaces）：会话 855a5094 三次 commit 失败栈均指向 `D:\repository\产品2.0\node_modules\node_modules\lint-staged\bin\lint-staged.js`；改为 REPO_ROOT + node 直跑后通过（src=2-0/008.md）。
- 验证证据（旧场景）：extracted source=cursor project=G
- 涉及文件：zhi2-web-admin/.husky/pre-commit、`D:\repository\泰兴G\node_modules\lint-staged\bin\lint-staged.js`
- 来源会话：855a5094-af56-4cd9-aa09-0a5ab6a8ea78、e8dad49f-1052-4158-899c-8a546531700d
- 代码基线：产品2.0 父仓 + zhi2-web-admin workspace

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "precommit_lintstaged_path",
  "source_extraction_id": "c236da9a3df445bb9d98b7def057c10b",
  "version": 4,
  "memory_type": "entities"
}
-->