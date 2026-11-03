# H5部署/h5/子路径时Tab图标须resolveStaticIcon
H5 部署在 /h5/ 子路径时，Tab 图标禁止用 /static 根路径，须用 resolveStaticIcon 解析。

## 问题根因
- 中间 Tab 使用 `/static/icon/icon_tab_middle.jpg` 会在 base `/h5/` 下请求到站点根 `/static/...` 导致 404
- 首页/我的若已用 resolveZhishuAsset，中间凸起按钮与问答页头像也需同样处理

## 解决方案
- 在 zhishuAsset.js 增加 resolveStaticIcon()（Vite import.meta.url 解析 static/icon）
- custom-tabbar.vue 中间按钮绑定 middleIcon 作为 src

## 验证与归属
- 验证会话：f82a50f9-f635-4d0d-8382-d57ff27fd4c7
- 验证证据：src=无锡市区小程序嵌入H5/006.md；另可改用相对路径或构建工具 resolve 别名映射资源位置
- 涉及文件：wygl-wxxcx-dev-slh 的 pages.json、components/custom-tabbar/custom-tabbar.vue、pages/service/index/index.vue、pages/webview/home.vue、pages/webview/externalWebview.vue；zhi2-mobile-admin-h5-c-unlimited 的 src/utils/zhishuAsset.js、src/pages/index/newHome.vue、src/pages.json、src/components/custom-tabbar/custom-tabbar.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：7de00b1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "tab_icon_resolve_static",
  "source_extraction_id": "b80256ade33b49b08266da7f93d995da",
  "version": 2,
  "memory_type": "entities"
}
-->