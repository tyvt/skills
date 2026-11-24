# 苏住房防汛C端移动查询H5

面向防汛业务的移动端查询 H5 项目，前端构建产物由本地 nginx 直读 dist 部署。

## 部署与配置
- 本地 nginx 安装在 `D:\nginx`，站点配置文件为 `conf\防汛C端.conf`。
- 正常配置只包含常规 `/api/` 反向代理，不含临时 location；干净版配置为 1789 字节、无 BOM。
- 修改配置后需在 `D:\nginx` 下执行 `nginx -t` 校验语法，再用 `nginx -s reload` 生效。

## 运行与验证
- 本地后端是 java 进程，占用 9608 端口；收尾时用 `Stop-Process -Force` 停止并确认端口为 FREE。
- 前端构建状态目录为项目的 `.task-state\build-*`，临时产物集中在 `%TEMP%\zentao-<bug号>\`。
- 构建通过 `bun run build:h5` 执行，产物直接由 nginx 读取 dist 目录。

## 运维经验
- Windows+PowerShell 经中文路径处理文件时，`Get-Content -Raw` 与 .NET `WriteAllText` 曾把 conf 写成 0 字节。
- 更稳的做法是先用 `Get-ChildItem` 取对象真实路径，再用 `Copy-Item` 字节级复制，并复核真实字节数（`Get-Item.Length` 可能为缓存假象）。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "前端项目",
  "name": "防汛C端",
  "source_extraction_id": "c0c302b4e3f6432db396cdac8d0cbecc",
  "version": 1,
  "memory_type": "entities"
}
-->