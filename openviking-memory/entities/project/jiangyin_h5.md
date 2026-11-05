# 江阴H5
江阴H5（智慧物业）uni-app Vue3 移动端 C 端项目，前端目录 D:epository\江阴H5，git 远程 origin/main（gitlab.zhi.com）。

## 环境配置
- 线上测试地址：http://221.228.70.192:8448/
- 本地 nginx 站点「江阴智慧物业H5」监听 8102，root 指向 D:/repository/江阴H5/dist
- 构建产物 dist 需由用户自行同步到 221.228.70.192:8448

## 页面与路由
- 中转登录页：src/pages/login.vue（pages.json 中 type: "home"）
- 账号密码登录页：src/pages/login/index.vue（路径 /pages/login/index）
- HTTP 封装：src/http/http.ts
- URL 工具：src/utils/url.ts

## 构建与部署
- 构建使用 bun（bunfig.toml hoisted linker），uni.exe 在 node_modules/.bin
- 本地部署走 nginx 站点 reload，远程需手动同步 dist

## 已知技术模式
- 登录死循环修复：见 login_option_loop_fix 实体
- 外链免密登录缺参数兜底：见 extlink_login_fallback 实体

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "jiangyin_h5",
  "source_extraction_id": "6208b41bb18d450f81a0c2117001922c",
  "version": 1,
  "memory_type": "entities"
}
-->