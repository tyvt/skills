# Vite5升Vite8硬阻塞与首屏优化
迁移Vite 5.4.11→8.3.5、unocss 66.5.10→66.12.0时，@vitejs/plugin-vue2不再支持、require()引用静态图成构建硬阻塞。
## 根因
- Vite 8不再支持@vitejs/plugin-vue2，需换vite-ng-plugin-vue2
- cardData.vue里require('down.png')/require('up.png')这种CommonJS式引用静态图，在Vite 8下是构建硬阻塞点(文件已删+引用方式不支持)，非警告
- vite.config.js里Vite 8已移除maxParallelFileOps，保留会直接报错
## 解决方案
- 插件换vite-ng-plugin-vue2 1.0.0，移除@vitejs/plugin-vue2；cardData.vue改el-icon趋势图标，去掉已删png的require
- vite.config.js删maxParallelFileOps；manualChunks置空交Rollup按动态import自动分包
- 标注插件(report/analyze)仅REPORT=1启用；virtual:svg-icons-register改动态import()异步chunk，入口降到约0.89MB，svg块独立1.72MB异步不进首屏
## 依赖与环境
- 父仓package.json补@unocss/core 66.12.0并npm install重算package-lock(根vite@5.4.11只保留给vite-plugin-externals的peer)；锁文件不強改避免与bun hoisting冲突
- 逐条核对环境差异(如V3有env/.env.production关VITE_CRYPTO_ENABLED，门户无此变量则跳过)；构建后还原public/version.json
## 验证与归属
- 验证：首屏0.89MB/异步chunk 1.72MB实测
- 涉及文件：zhi2-web-admin/package.json、vite.config.js、src/main.js、SvgIcon/index.vue、cardData.vue、根package.json
- 来源会话：session-6a38945c-e285-4f83-a76e-70731f47427f；代码基线：d8addc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_upgrade_block",
  "source_extraction_id": "5d05348d377f486f9526d8d733266d81",
  "version": 1,
  "memory_type": "entities"
}
-->