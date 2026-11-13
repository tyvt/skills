# 宿迁存量房前端项目
宿迁存量房（cunliangfang）FE 管理端 H5 项目，git 远程分支 origin/suqian-all-cunliangfang-dev-v1.0.0。

## 技术栈与构建
- Vue CLI 项目（webpack 4/5），Node 22 需设置 NODE_OPTIONS=--openssl-legacy-provider 规避 OpenSSL md4 报错
- npm registry 为 npmmirror（国内加速）；npm install 约 16s（877 包）
- 构建命令 npm run build（vue-cli-service build），产物输出 dist/web（含 index.html、css、js×760、fonts、img、pluginWebUpdateNotice）
- dist/ 与 node_modules/ 均在 .gitignore 中，不进版本库
- 构建受 gate 限制不能在宿主直接运行，须通过 orchestrate 以 detached 后台进程方式启动并轮询日志文件

## 分支与提交
- 开发分支 suqian-all-cunliangfang-dev-v1.0.0
- Bug 6538（人证比对）修复提交 be97d184；视频签字 sign_video 同源修复提交 47ab527e（2026-11-12）
- 本地验收站点示例：http://222.187.193.195:8991/web/（部署 dist/web 后刷新验证）

## 相关组件
- peoIdcardValida.vue：人证比对高拍仪组件（禅道 Bug 6538）
- sign_video.vue：买受方视频签字高拍仪组件（同源缺陷，47ab527e 修复）
- brokContSignInfo.vue：合同签约页，引用上述两组件

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited",
  "category": "宿迁存量房前端",
  "name": "suqian_cunliangfang_h5",
  "source_extraction_id": "958ac1b1dbf8447d85e7ed3e89f70cdf",
  "version": 1,
  "memory_type": "entities"
}
-->