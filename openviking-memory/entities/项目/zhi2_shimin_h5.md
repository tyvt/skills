# 园区市民h5智数c前端仓库(zhi2/yuanqu)
苏州园区住房市民h5智数c前端仓库，GitLab路径 zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c，使用 dev-v0 分支，为 uni-app Vue3 H5 项目。

## 技术栈与构建
- 使用 uni-app Vue3 H5，关键目录含 src/pages-my/customer、src/http、src/utils
- 类型检查 `npm run type-check` 基线 147 个错误（历史预存：$tracker、$uv、缺 target 等），本次改动文件零新增错误
- `npm run test` 与 `npm run build` 均构建通过；开发服务器端口 9000
- 使用 Playwright 针对运行中的 dev 服务器做运行时验证（点击连击、面板开关、日志聚合）
- 构建会重新生成 src/manifest.json 与 src/pages.json，需还原避免混入提交

## vite-plugin-vconsole 行为
- `vite-plugin-vconsole` 仅在 test 模式静态注入 vconsole，production 模式不注入
- 生产包打开面板需运行时 `await import('vconsole')` 动态加载，不依赖插件环境开关
- 动态导入在生产模式会单独拆成 chunk（约 280KB / gzip ~90KB），仅触发时加载

## 近期实现
- 客服中心头像十连击唤醒 vConsole：src/pages-my/customer/index.vue 绑定 handleAvatarTap，2 秒内连点 10 下切换面板；新增 src/utils/vconsole.ts 与 src/utils/tapCounter.ts
- 接口层聚合打印入参与响应：src/http/interceptor.ts 与 src/http/http.ts 请求只登记入参，响应合并成一条日志；删除原 console.log 避免重复；敏感字段打码
- 两功能已实现并推送 dev-v0（提交 d01caad）；远程新提交 676095b（修复附件不显示bug）已 rebase 无冲突后推送
- 计划送 plan_reviewer 得 78 分通过（0 阻断），3 条 P1 建议已落实

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_shimin_h5",
  "source_extraction_id": "8222216e9b4d46d981824f219e74c842",
  "version": 1,
  "memory_type": "entities"
}
-->