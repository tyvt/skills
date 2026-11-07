
# 项目部署在 /sz/ 子路径：地址自适应相对路径
产品2.0 前端部署在网关 /sz/ 子路径下，所有对后端/静态资产的地址须走相对当前页面 URL 解析，禁止写死前缀（含 version.json）。

## 问题现象
- 部署在 /sz/ 子路径（如 https://…/sz），接口 base、version.json 版本校验地址若写死根路径前缀就 404
- 写死 '/version.json' 或 VITE_APP_PUBLIC_PATH 这类前缀与部署子路径耦合，换环境就失效

## 解决方案
- 所有地址走相对当前页面 URL 解析；version-check.js 默认地址从 '/version.json' 改为相对 'version.json'
- vite.config.js 里 public/version.json 是构建时写文件的磁盘路径，不是浏览器请求 URL，不存在前缀问题，不要误改
- env/.env 不再依赖 VITE_APP_PUBLIC_PATH

## 部署硬约束
- 访问 https://…/sz（无尾斜杠）或 /sz#/login（sz 与 # 之间无 /）时，浏览器把最后一段当文件名，相对解析会落到站点根
- Nginx 须把 /sz 301 到 /sz/，hash 路由地址保持 /sz/#/xxx 形态

## 涉及与来源
- 涉及文件：version-check.js、vite.config.js、env/.env；所属项目：产品2.0
- 来源会话：faf38ec5；代码基线：b2ce3e2 / c420af5


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sz_subpath_relative",
  "source_extraction_id": "b2ef880cfdd147c9bc8ecd0a19ff7f54",
  "version": 1,
  "memory_type": "entities"
}
-->