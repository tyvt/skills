# zhi3 图片缩略图 previewByTicket 401 与网关登录白名单
苏州房产管理端 H5 新增页缩略图改走 `previewByTicket` 后返回 401 的定位过程、根因与修复方向。

## 现象
- 清理可能残留的附件后实传图片成功，缩略图改为走 `previewByTicket` 拉取，但该请求直接返回 401。

## 定位过程
- 先怀疑票据与路径的绑定校验不通过，用刚签发的票据重打一次并核对 Redis 中存的路径，问题依旧。
- 再查网关登录白名单快照，其中没有 `previewByTicket` 条目；随后查 `StringUtils.matches` 的通配规则以确认该补哪一条。

## 根因
- 401 根因：`previewByTicket` 未加入网关登录白名单，img 标签又无法携带请求头，网关拿不到登录令牌即拦成「令牌不能为空」。
- 白名单配置在 Nacos，本机没有 Nacos、改不了本地副本，最终未走白名单方案。

## 修复与验证
- 网关识别的查询参数名在工具里被脱敏，用字节比较确认就是前端已在用的 `token`；登录令牌存放在 `sessionStorage`。
- 票据通道本身是通的：带上登录 `token` 后 `previewByTicket` 返回 200；缩略图地址此前漏了这个参数。
- 2026-11-24 给缩略图地址补上 `token`，重新构建通过，页面验证不再显示「加载失败」，并截图回写禅道 bug 6909。
- 截至 2026-11-24，`previewByTicket` 仍未加入网关登录白名单，登录态图片靠 URL 上的 `token` 通过；客户环境需部署后端 `dev`（61e3dc4a）后才生效。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi3_preview_ticket_401",
  "source_extraction_id": "37c4bb039e3b40f9ab8a141a0a3ea983",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->