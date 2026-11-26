# 苏住房防汛C端 H5 项目
苏州住房保障 C 端移动端查询 H5 项目，涉及登录页、子系统选择页及个人中心等页面的迁移与像素级还原。

## 开发环境
- 主工作区 D:\repository\苏住房防汛C端，严禁直接修改
- 可写 worktree：D:\repository\苏住房防汛C端-wt-login-align，分支 fix/login-design-align
- 源码含 GBK mojibake，需用 read 工具读取、用 edit/write 修改

## 构建与部署
- 构建命令 bun run build
- 本地部署站 http://127.0.0.1:8095/（nginx 指向 worktree dist），nginx UI 127.0.0.1:9000
- 图标资源可从 http://localhost:8443/assets/*.svg 获取
- Playwright 的 npx 存在双版本冲突，需用 node 直接调用 @playwright/test 的 cli.js 或写独立 mjs
- 截图需拦截 **/font/** 与 **/*.woff2*，deviceScaleFactor:2

## 协作方式
- dist 由多人共用，build 前须向 Lead 报备确认以避免与 data-builder 并发构建

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "项目",
  "name": "苏住房防汛C端H5项目",
  "source_extraction_id": "f1b691e99e634420b9e0fd5beb442d5b",
  "version": 1,
  "memory_type": "entities"
}
-->