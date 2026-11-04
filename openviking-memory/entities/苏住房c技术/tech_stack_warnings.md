# 苏住房C 市民端技术栈与构建告警口径
苏住房C 市民端 zhi2-mobile-shimin 是 Vue3 + Vite 的 uni-app 工程，index.html 全局脚本与 vite sourcemap 重复是两类高频噪声，需分清噪声与真错。

## 技术栈与结构
- 移动端工程 zhi2-mobile-shimin：uni-app，Vue3 + Vite，页面按 pages_owner / pages_owner_extra / pages_transaction / pages_my / pages_tab 业务域分包
- 静态资源按页面目录 static 就近放，如 pages_owner/repair/static/
- /static/js/utils 下国密/字节工具（如 byteUtil.js）走 pre-commit ESLint 门禁

## 构建噪声与真错
- index.html 里 /static/js/crypto-js.min.js、/static/js/sign.js 用 `<script defer>` 经典脚本加载，Vite 只 bundle ES module，提示「未被 module 化」属预期行为可忽略（sign.js 依赖全局 window.CryptoJS 必须用经典脚本），只需确认产物可访问
- vite.config.ts 的 build 里若条件编译写两个 sourcemap 键，esbuild 报 duplicate-object-key 且静默覆盖，是真正要修的配置错误
- sourcemap 收敛为一条：`sourcemap: process.env.UNI_PLATFORM === 'h5' ? mode !== 'production' : false`

## 提交门禁与修复
- byteUtil.js 混用空格与 Tab 触发 no-mixed-spaces-and-tabs 直接拦提交，统一缩进后对该文件跑 eslint --fix 再 git add 重新提交
- 处理构建日志先分层：「脚本未 module」类忽略；duplicate-object-key、resolve 失败清单才是要改的

## 验证与归属
- 会话 2adc93a0 / f3ee482c（基线 0011377）：解释 index.html 两个 defer 脚本 WARN 为预期；修 vite.config.ts 重复 sourcemap 合并为条件表达式
- 会话 926ce7a5（基线 166ed47）：byteUtil.js 混用空格 Tab 触发 no-mixed-spaces-and-tabs，eslint --fix 后提交通过
- 涉及文件：index.html、vite.config.ts、src/static/js/sign.js、src/static/js/utils/byteUtil.js；所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "tech_stack_warnings",
  "source_extraction_id": "f9c3a7f4992547a18e59f7352998fcc3",
  "version": 1,
  "memory_type": "entities"
}
-->