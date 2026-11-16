# 苏住房防汛C端 H5 nginx 站点
苏住房防汛C端移动查询H5 的本地 nginx 站点（苏住房防汛C端.conf），监听 8095 直接服务本地 dist。

## 站点配置
- 站点文件 苏住房防汛C端.conf，root D:/repository/苏住房防汛C端/dist，监听 8095
- nginx 安装在 D:\nginx；主配置中无 8095，站点定义在 include 的子配置里
- 2026-11-16 核对：构建完成后即已部署（root 指向项目 dist），无需改动 nginx
- 2026-11-16 核对：当前站点 conf 与 bak-evalmock 备份逐行相同，即当前无 mock、直连真实网关
- location /api/ 反代 dev 网关；2026-11-14 核对发现该代理指向旧 dev 网关，学习、新闻与横幅接口在该代理下报 404，而项目默认测试网关已有这些数据
- 本地采用 hash 模式路由；截图校验期间会临时调整该站点配置并备份、事后恢复

## 联调与测试
- Playwright e2e 端口 8095
- 测试凭证 zsbase / Zs@2026Aa!，密码 AES-CBC 加密见 src/utils/passwordEncrypt.js

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "fangxun_h5_nginx",
  "source_extraction_id": "6138828c21f343448d40413458bbf858",
  "version": 2,
  "memory_type": "entities"
}
-->