# zhi2-mobile-admin-h5-b-unlimited
苏州住房 B 端管理后台 H5 项目（GitLab `zhi2-mobile-admin-h5-b-unlimited`），uni-app + Vue3，包管理器 npm，构建命令 `npm run build:h5`，主分支 main。

## 页面与功能
- 选择子系统页面（`src/pages/systems/index.vue`）：iOS 返回箭头 + 居中「选择子系统」固定头、Fluent 3D 插画、脉动胶囊提示条、两列圆角图标卡片；动态数据来自接口，授权校验与 SSO 跳转逻辑保留。
- 参考插画按原始渐变/path 复刻为静态资源 `src/static/assets/system-hero.svg`；页面样式在 `src/styles/theme.css`。

## 接口与登录
- 网关同时提供 `/api` 接口与 `/zhi2-dev` logo 文件；apps 接口必须带 Authorization 头，否则代理返回 502。
- 真实登录方式为手机号 + 短信验证码（token 不回显）；真实应用列表返回「物业手持」「测试」两个已授权应用。
- 本地实机验证用反向代理：构建 dist 由本地服务，`/api` 与 `/zhi2-dev` 转发到真实网关。
- 2026-11-27 工作台 `openH5()`（`src/pages/workbench/index.vue:216-221`）跳转防汛C端H5时在 hash query 的 `from=handheld`/区域参数后追加 `&token=${encodeURIComponent(userStore.token)}`（token 非空才加），用于C端免登；`userStore` 与 `H5_BASE`（防汛C端 `...query.mobile.v2.suzhufang...`）已在该文件导入。提交 `95e53d5` 推送至 `origin/main-suzhufang`。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_admin_h5_b",
  "source_extraction_id": "f404fc2d35f845d58b2151973d264dcf",
  "version": 2,
  "memory_type": "entities"
}
-->