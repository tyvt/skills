# 后端相对资源路径解析：new URL 相对 location.href
产品2.0 前端通过 resolveServerAssetUrl 用 new URL(相对路径, window.location.href) 按当前页面地址解析后端返回的资源路径，自适应子路径部署。

## 问题现象
- 后端返回资源路径形如 /zhi2/（带前导/，相对站点根），前端部署在 /sz/ 子路径时按 origin 拼接会丢掉 /sz 前缀导致 404
- 写死 origin + '/zhi2' 或依赖 VITE_APP_PUBLIC_PATH 都与部署子路径耦合，换环境失效

## 解决方案
- 在 resolveServerAssetUrl 里把后端路径去掉开头斜杠，用 new URL('zhi2/...', window.location.href) 按浏览器相对解析规则对齐当前页面地址
- /sz/login 下解析为 /sz/zhi2/…，本地 dev 下解析为根路径 /zhi2/…，行为与旧 origin 拼接一致但自适应子路径
- 配套删掉 env/.env 里的 VITE_APP_PUBLIC_PATH 注释

## 边界与约束
- 该方案要求页面 URL 以 / 结尾或 hash 前有 /，否则最后一段被当文件名
- 部署侧须保证 /sz 301 到 /sz/，避免相对解析落到站点根

## 涉及与来源
- 涉及文件：zhi2-web-admin/src/utils/resolveServerAssetUrl.js、zhi2-web-admin/src/views/login.vue、env/.env
- 所属项目：产品2.0；来源会话：9d79292e-940d-4d5f-b243-3a366235b459；代码基线：5a86102

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resolve_server_asset_url",
  "source_extraction_id": "539ec7c1bcb244a59f86e9efe4783557",
  "version": 1,
  "memory_type": "entities"
}
-->