# uni-app 改不了构建输出目录
这版 uni-cli 在 config() 钩子里强制覆盖 build.outDir 为 dist/{build|dev}/{platform}，只有 CLI 的 --outDir 生效。

## 问题根因
- vite.config.js 的 build.outDir 无效、环境变量 UNI_OUTPUT_DIR 也无效
- uni-cli 在 config() 钩子里强制覆盖 build.outDir，发生在用户配置之后
- 唯一生效的是 CLI 的 --outDir 参数（CLI 层参数，在 config 钩子之后生效）

## 解决方案
- 只在 npm scripts 里传 --outDir：dev 用 uni --outDir fwzlhtba、build:dev 用 uni build --mode development --outDir fwzlhtba、build:test 用 uni build --mode test --outDir fwzlhtba、build 用 uni build --outDir fwzlhtba
- dev 脚本不能带 --outDir（只对 build 生效，带上报 Unknown option）
- .gitignore 忽略根目录 /fwzlhtba
- vite.config.js 不留任何改 outDir 的死代码（UNI_OUTPUT_DIR、build.outDir 都回退）
- 验证：npm run build 与 build:test 产物落在 fwzlhtba/，引用 ./assets/、./static/，test 产物含 /api；三环境共用目录会互相覆盖勿同时留两份

## 验证与归属
- 验证证据：会话 ab0d5322，用户诉求 1「把打包目录名称改为 fwzlhtba」、诉求 4「根目录就是 fwzlhtba」；最终结论 vite.config.js 无改动、尝试方案被覆盖已回退
- 涉及文件：package.json、vite.config.js、.gitignore
- 所属项目：宿迁苏服办；来源会话：ab0d5322-c6f5-44d7-b17e-c89a9bd4b966；代码基线：6996f66

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_build_outdir",
  "source_extraction_id": "27867a746efe4299a0f31f9b4c78b5d9",
  "version": 1,
  "memory_type": "entities"
}
-->