# file:eslint-rules插件未刷新致规则未找到
husky pre-commit 跑 eslint --fix 时，每个 Vue 文件报 Definition for rule '...' was not found，根因是 file:eslint-rules 本地插件改完后 node_modules 未同步。
## 现象
- pre-commit 全量 ESLint 报 Definition for rule 'duplicate-attributes/no-duplicate-vue-options' was not found，提交被拦截。
## 根因
- package.json 用 file:eslint-rules 安装 eslint-plugin-duplicate-attributes，仓库 eslint-rules/ 已注册 no-duplicate-vue-options.cjs。
- node_modules/eslint-plugin-duplicate-attributes 仍是旧快照，配置启用第三条规则却找不到实现。
- 常见触发：改完 eslint-rules 后没跑 npm install，或 file: 依赖未正确刷新。
## 处理
- 项目根执行 npm install 让 node_modules 与 eslint-rules 同步。
- 临时可手拷 index.js 与 lib/rules/*.cjs 到 node_modules 救急，但不应依赖手拷进版本库。
- 与「规则本身拦截重复 Vue 选项」不同，本条是插件安装物过期。
## 验证与归属
- 涉及文件：zhi2-web-admin/package.json、zhi2-web-admin/eslint-rules/index.js、zhi2-web-admin/eslint-rules/lib/rules/no-duplicate-vue-options.cjs、zhi2-web-admin/node_modules/eslint-plugin-duplicate-attributes。
- 验证证据：会话 012d20d5 中 pre-commit eslint --fix 失败，最终结论写明 node_modules 插件缺 no-duplicate-vue-options.cjs。
- 所属项目：2-0；来源会话：012d20d5-ca94-45c8-ae40-518070817b73；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eslint_rules_stale",
  "source_extraction_id": "db699db3e683428f80cc7d381629b63a",
  "version": 1,
  "memory_type": "entities"
}
-->