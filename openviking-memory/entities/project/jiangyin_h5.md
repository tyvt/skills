# 江阴H5
江阴H5（智慧物业）uni-app Vue3 移动端 C 端项目，前端目录 D:\repository\江阴H5，git 远程 origin/main（gitlab.zhi.com）。

## 环境配置
- 线上测试地址：http://221.228.70.192:8448/（非本机 nginx 管理，本机仅监听 8102；需用户将 D:\repository\江阴H5\dist 发布到该服务器才生效）
- 本地 nginx 站点「江阴智慧物业H5」监听 8102，root 指向 D:/repository/江阴H5/dist
- 构建产物 dist 需由用户自行同步到 221.228.70.192:8448
- 构建使用 bun（bunfig.toml hoisted linker），uni.exe 在 node_modules/.bin；本地部署走 nginx 站点 reload，远程需手动同步 dist

## 页面与路由
- 共有资金菜单页：src/pages/menus.vue（路由 #/pages/menus），5 个菜单图标原本 import 引入 28×28 约 1KB PNG
- 中转登录页：src/pages/login.vue（pages.json 中 type: "home"）
- 账号密码登录页：src/pages/login/index.vue（路径 /pages/login/index）
- HTTP 封装：src/http/http.ts
- URL 工具：src/utils/url.ts
- 当前工作区 江阴公共收益 是 B 端 admin，不含 menus 页面；C 端代码在同级仓库 D:\repository\江阴H5

## 裂图修复（禅道任务2330）
- 根因：生产 nginx 响应头 Content-Security-Policy: default-src 'self'（无 img-src），Vite 默认 assetsInlineLimit=4096 将小图内联为 data:image/png;base64 被 CSP 拦截；较大图片以真实文件输出正常
- 修复：menus.vue 5 图标改 /static/images/home/menu_icon*.png 绝对路径、去掉 import；图标从 src/pages/static/ git rename 到 src/static/images/home/；vite.config.ts 设 build.assetsInlineLimit: 0 全局禁止内联
- 验证：构建菜单 chunk 8475B→1214B，data:image 出现 0 次；兄弟项目 惠山二期H5 同款 menus.vue 用 /static/images/home/*.png 真实文件无此问题
- 遗留 CSP：运行时生成 data: 图片（登录图形验证码、z-paging 空态图、echarts canvas 导出、uni loading 转圈）仍被拦截，前端无法消除；建议运维在生产 nginx 补 img-src 'self' data:
- Git：worktree 江阴H5-wt-2330 / 分支 fix/2330-menu-image-display 提交 db3b953 → fast-forward 合并 main → 推送 origin/main；worktree 与分支已删
- 禅道回写：zt_task 2330 status=done、finishedBy=tiany、finishedDate=2026-11-09 09:28:30、assignedTo 回 zhouzhijing，新增 zt_action action=finished

## 已知技术模式
- 登录死循环修复：见 login_option_loop_fix 实体
- 外链免密登录缺参数兜底：见 extlink_login_fallback 实体

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "jiangyin_h5",
  "source_extraction_id": "a9cd2db795134d0cb8a0451ae582c166",
  "version": 2,
  "memory_type": "entities"
}
-->