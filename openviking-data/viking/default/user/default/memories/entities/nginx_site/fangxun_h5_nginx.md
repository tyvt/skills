# 苏住房防汛C端 H5 nginx 站点
苏住房防汛C端移动查询H5 的本地 nginx 站点（苏住房防汛C端.conf），监听 8095 直接服务本地 dist。

## 站点配置
- 站点文件 苏住房防汛C端.conf，root D:/repository/苏住房防汛C端/dist，监听 8095
- nginx 安装在 D:\nginx；主配置中无 8095，站点定义在 include 的子配置里
- 2026-11-16 核对：构建完成后即已部署（root 指向项目 dist），无需改动 nginx
- 2026-11-16 核对：当前站点 conf 与 bak-evalmock 备份逐行相同，即当前无 mock、直连真实网关
- location /api/ 反代 dev 网关；2026-11-14 核对发现该代理指向旧 dev 网关，学习、新闻与横幅接口在该代理下报 404，而项目默认测试网关已有这些数据
- 本地采用 hash 模式路由；截图校验期间会临时调整该站点配置并备份、事后恢复

## 验证地址争议
- 2026-11-24 用户明确指出 8095 本地部署验证地址有误；助手经 nginx UI 与磁盘 conf 全量核查，仍只有「防汛C端.conf」一个本项目站点（8095，root 本仓 dist），最终以 8095 实机验证
- 2026-11-24 经 nginx UI 数据库 `sites` 表确认本项目唯一站点为「防汛C端」（id=29，未软删除，8095 → 本仓 dist），无需重新部署
- 2026-11-24 排除 8091（「门户H5」站点，内嵌防汛为旧构建）与 8106（房地产监测应用），二者均非本项目验证站点
- 2026-11-24 在 8095 上已取得 URL 级证据：详情跳转按 rescueId 传参 `?id=2124811065694998530`
- 2026-11-24 以 8095 为验证地址实机登录成功并进入求援工单列表

## 联调与测试
- 2026-11-24 站点由本机 nginx UI 管理，面板详情见「nginx_ui」
- Playwright e2e 端口 8095
- 测试凭证 zsbase / Zs@2026Aa!，密码 AES-CBC 加密见 src/utils/passwordEncrypt.js

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "fangxun_h5_nginx",
  "source_extraction_id": "a5bb84377f824810939d97ca9ef65808",
  "version": 4,
  "memory_type": "entities"
}
-->