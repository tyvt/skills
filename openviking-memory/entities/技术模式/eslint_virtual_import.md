# ESLint虚拟模块导入忽略
园区物管2.0 的 pre-commit ESLint 会因 Vite 虚拟模块与 ?raw 导入报 import/no-unresolved，需在 eslintrc 配 ignore。
## 问题背景
- 对暂存 *.vue 执行 ESLint，提交被 import/no-unresolved 拦截，报无法解析的模块。
- 代码含 import 'virtual:svg-icons-register'，是 Vite 插件生成的虚拟模块，ESLint import 解析器无对应路径必然 unresolved。
## 解决方案
- 在 .eslintrc.cjs 给 import/no-unresolved 配置 ignore：['error', { ignore: ['^virtual:', '\?raw$'] }]，覆盖 virtual: 模块与 ?raw 原始导入。
- 该配置文件必须一并 git add 进暂存区，否则其他同事或后续会话改到含 virtual: 导入的文件时会复现拦截。
- 对单独的 ?raw 导入（如 import svg from './apply.svg?raw'）也可在导入上行加 eslint-disable-next-line import/no-unresolved 局部豁免，再正常 git add 相关文件重新提交；所有 ?raw / ?url 等查询后缀导入都会触发，遇到同类 pre-commit 失败先怀疑后缀导入而非路径写错。
## 验证与归属
- 验证：会话 dc317c9d 中 SvgIcon/index.vue 的 virtual: 导入触发失败，以 .eslintrc.cjs 增加 ignore 规则解决并说明需加入暂存区。
- 涉及文件：zhi2-web-admin/.eslintrc.cjs、zhi2-web-admin/src/components/SvgIcon/index.vue；所属项目：园区物管2.0；代码基线：f00310232。
- 补充：会话 ef34d9ad 中 fundPanorama/index.vue 的 ?raw 导入触发 import/no-unresolved，以 eslint-disable-next-line 局部禁用解决并补 git add；代码基线：6a4835a08；来源会话：ef34d9ad-7535-4fd3-a353-b17efa7397bf。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eslint_virtual_import",
  "source_extraction_id": "a1ffc258770840b091dc679561b91a7b",
  "version": 2,
  "memory_type": "entities"
}
-->