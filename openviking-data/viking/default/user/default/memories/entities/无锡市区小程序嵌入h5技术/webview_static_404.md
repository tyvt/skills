# 迁入门户webview后本地图404修复
小程序页面迁入门户 H5 后静态资源被错误拼到 /h5/pages/webview/static 导致 404，改用 resolveZhishuAsset + import.meta.url。

## 问题根因
- 把小程序 pages/webview、pages/face 等迁入 H5 后，请求变成 /h5/pages/webview/static/images/zhishu/… 全部 404
- 模板或脚本按「当前页面路径」拼接 /static 或 ./static，Vite base 为 /h5/ 时解析到错误目录
- 接口返回的 /zhi2/… 远程轮播在未代理环境也会 404

## 解决方案
- 与 home.vue 一致，用 resolveZhishuAsset（new URL(..., import.meta.url)）引用 src/static/images/zhishu/，由 Vite 打包出正确 URL
- 门户轮播固定本地 背景@2x.jpg、banner.jpg，菜单图标走同一解析函数
- 迁移时检查 getH5Param 等工具勿重复声明，否则整页 async 组件加载失败（报 SyntaxError）

## 验证与归属
- 验证会话：ddd4e8f5-1767-467c-8d93-f66c079e9dca
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/zhishuAsset.js、src/pages/webview/home.vue、src/pages/index/home.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：9267b1a

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_static_404",
  "source_extraction_id": "af236467f8db4b978378c3b60607a339",
  "version": 1,
  "memory_type": "entities"
}
-->