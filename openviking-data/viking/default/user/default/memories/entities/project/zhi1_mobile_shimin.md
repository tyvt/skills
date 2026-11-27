# zhi1-mobile-shimin-h5-zhishu-c
昆山武港 C 端 uni-app + Vue3 H5 项目，GitLab `gitlab.zhi.com/zhi/suzhou/kunshan/wuguan/fe/zhi1-mobile-shimin-h5-zhishu-c-unlimited`，主分支 main。

## 项目信息
- 包管理器 npm；H5 构建 `npm run build`，小程序构建 `npm run build:mp`。
- 个人中心页面为 `src/pages_home/personal.vue`，vConsole 工具在 `src/utils/vconsole.js`，`vconsole` 已是项目依赖。
- 本地通过 nginx 独立站点部署在端口 8190。

## 已知问题与残留
- `npm run build:mp` 因预存的 axios 适配器解析问题（`axios/lib/core/createError`，来自 `node_modules/axios-miniprogram-adapter`）失败，与本次改动无关。
- 工作区残留 `.npmrc`/`vite.config.js` 改动及未跟踪文件为会话前既有状态，未纳入功能提交。

## 关键提交
- 2026-11-27 提交 `4600470`「feat: 个人中心头像连点10下唤起vConsole控制台」已推送 `origin/main`。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi1_mobile_shimin",
  "source_extraction_id": "6fc6b8f7bebb49ca8bb89dd1f0217389",
  "version": 1,
  "memory_type": "entities"
}
-->