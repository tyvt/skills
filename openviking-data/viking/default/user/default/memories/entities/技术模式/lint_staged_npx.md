# pre-commit 改用 node 直接执行 lint-staged
产品2.0 前端在 npm workspaces 下修正 pre-commit 钩子，绕开 npx 对 lint-staged 的错误路径解析。

## 问题根因
- 在 npm workspaces 下，即使 cd 进 zhi2-web-admin 再跑 `npx lint-staged`，npx 仍解析出错误路径 `node_modules\node_modules\lint-staged`

## 解决方案
- pre-commit 不再使用 npx
- 先 cd 到 zhi2-web-admin 保证子项目目录，再用 REPO_ROOT 得到仓库根目录
- 用 `node "$REPO_ROOT/node_modules/lint-staged/bin/lint-staged.js"` 直接执行根目录安装的 lint-staged

## 涉及信息
- 真实路径：D:\repository\产品2.0\node_modules\lint-staged\bin\lint-staged.js
- 验证证据：extracted source=cursor project=2-0；来源会话：855a5094-af56-4cd9-aa09-0a5ab6a8ea78

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lint_staged_npx",
  "source_extraction_id": "1f8c04859ada4140bd4d762d8c5a4972",
  "version": 1,
  "memory_type": "entities"
}
-->